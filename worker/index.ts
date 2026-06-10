// Export the Workflow and Durable Object classes
export { MyWorkflow } from "./workflow";
export { WorkflowStatusDO } from "./durable-object";

const SERVICE_WORKER_CODE = `
const CACHE_NAME = 'ajn-archive-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((c) => {
      return c.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(names.map((n) => n !== CACHE_NAME && caches.delete(n)));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  
  if (url.pathname === '/' && url.searchParams.has('url')) {
    e.respondWith(
      fetch(e.request)
        .then((r) => {
          if (r.status === 200) {
            caches.open(CACHE_NAME).then((c) => c.put(e.request, r.clone()));
          }
          return r;
        })
        .catch(() => {
          return caches.match(e.request).then((c) => c || new Response('Offline', { status: 503 }));
        })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then((c) => {
        return c || fetch(e.request).catch(() => {
          return new Response('Offline', { status: 503 });
        });
      })
    );
  }
});
`;

/**
 * Main Worker fetch handler
 *
 * Handles CORS proxy for RSS feeds and other requests
 */
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// Service Worker: Serve the service worker script
		if (url.pathname === '/service-worker.js') {
			return new Response(SERVICE_WORKER_CODE, {
				headers: {
					'Content-Type': 'application/javascript',
					'Cache-Control': 'public, max-age=3600',
					'Service-Worker-Allowed': '/'
				}
			});
		}

		// CORS Proxy: Handle RSS feed requests via ?url= parameter
		if (url.searchParams.has('url')) {
			const targetUrl = url.searchParams.get('url');
			if (!targetUrl) {
				return new Response('Missing url parameter', { status: 400 });
			}

			try {
				const response = await fetch(targetUrl, {
					method: request.method,
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
					}
				});

				const contentType = response.headers.get('content-type');
				const body = await response.text();

				return new Response(body, {
					status: response.status,
					headers: {
						'Content-Type': contentType || 'application/xml',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
						'Access-Control-Allow-Headers': 'Content-Type',
						'Cache-Control': 'public, max-age=3600'
					}
				});
			} catch (err) {
				console.error('Proxy error:', err);
				return new Response(
					JSON.stringify({ error: String(err) }),
					{ 
						status: 500,
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*'
						}
					}
				);
			}
		}

		// API: Start a new workflow instance
		if (url.pathname === "/api/workflow/start" && request.method === "POST") {
			try {
				const instance = await env.MY_WORKFLOW.create({
					params: {
						timestamp: Date.now(),
					},
				});

				return Response.json({
					instanceId: instance.id,
					message: "Workflow started successfully",
				});
			} catch {
				return Response.json(
					{ error: "Failed to start workflow" },
					{ status: 500 },
				);
			}
		}

		// API: Get workflow status
		if (url.pathname.startsWith("/api/workflow/status/")) {
			const instanceId = url.pathname.split("/").pop();
			if (!instanceId) {
				return Response.json(
					{ error: "Instance ID required" },
					{ status: 400 },
				);
			}

			try {
				const instance = await env.MY_WORKFLOW.get(instanceId);
				const status = await instance.status();
				return Response.json(status);
			} catch {
				return Response.json(
					{ error: "Failed to get workflow status" },
					{ status: 500 },
				);
			}
		}

		// API: Send event to workflow instance
		if (
			url.pathname.startsWith("/api/workflow/event/") &&
			request.method === "POST"
		) {
			const instanceId = url.pathname.split("/").pop();
			if (!instanceId) {
				return Response.json(
					{ error: "Instance ID required" },
					{ status: 400 },
				);
			}

			try {
				const body = (await request.json()) as {
					approved: boolean;
					comment?: string;
				};
				const instance = await env.MY_WORKFLOW.get(instanceId);

				await instance.sendEvent({
					type: "user-approval",
					payload: body,
				});

				return Response.json({
					success: true,
					message: "Event sent successfully",
				});
			} catch {
				return Response.json(
					{ error: "Failed to send event" },
					{ status: 500 },
				);
			}
		}

		// WebSocket: Connect to workflow status updates
		if (url.pathname === "/ws") {
			const instanceId = url.searchParams.get("instanceId");
			if (!instanceId) {
				return new Response("instanceId query parameter required", {
					status: 400,
				});
			}

			const upgradeHeader = request.headers.get("Upgrade");
			if (upgradeHeader !== "websocket") {
				return new Response("Expected Upgrade: websocket", { status: 426 });
			}

			try {
				const doId = env.WORKFLOW_STATUS.idFromName(instanceId);
				const stub = env.WORKFLOW_STATUS.get(doId);
				return stub.fetch(request);
			} catch {
				return new Response("Failed to establish WebSocket connection", {
					status: 500,
				});
			}
		}

		return Response.json({ error: "Not Found" }, { status: 404 });
	},
} satisfies ExportedHandler<Env>;
