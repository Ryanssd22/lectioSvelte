// Martyrology API
import martyrology from '$lib/data/martyrology.json';
import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET = ({ url }) => {
	const date = url.searchParams.get('date');
	// console.log('Martyrology API:', url);
	if (!(date in martyrology)) {
		return error(400, `Date (${date}) does not exist`);
	} else {
		return json(martyrology[date]);
	}
};
