export async function handle({ event, resolve }) {
	const response = await resolve(event);

	//Http caching
	if (event.url.pathname.endsWith('.wasm')) {
		response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
		response.headers.set('Content-Type', 'application/wasm');
	}

	return response;
}
