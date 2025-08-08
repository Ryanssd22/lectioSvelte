//Summa loader for part
//Lists out all questions concerning treatise

export const load = async ({ params, parent, fetch }) => {
	const { summaParts, part } = await parent();
	const treatises = await (await fetch(`/api/summa?part=${part}`)).json();

	return {
		treatises: treatises
	};
};
