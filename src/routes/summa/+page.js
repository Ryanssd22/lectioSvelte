// Redirects user to summa/FS

import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(307, '/summa/FS');
}
