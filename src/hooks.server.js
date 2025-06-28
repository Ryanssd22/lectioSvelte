export async function handle({ event, resolve }) {
	if (event.url.pathname.endsWith('.wasm')) {
		const response = await resolve(event);
		
		try {
			const body = response.body;
			const headers = new Headers(response.headers);
			
			headers.set('Cache-Control', 'public, max-age=31536000, immutable');
			headers.set('Content-Type', 'application/wasm');
			
			return new Response(body, {
				status: response.status,
				statusText: response.statusText,
				headers
			});
		} catch (error) {
			console.error('Hook error:', error);
			return response; 
		}
	}
	
	return await resolve(event);
}
