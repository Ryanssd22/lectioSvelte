// Passes in base summa to Summa layout

export const load = async ({ fetch, params }) => {
	const { part = null, treatise = null, question = null } = params;
	const summaParts = await (await fetch('/api/summa')).json();

	return {
		summaParts: summaParts,
		part: part,
		treatise: treatise,
		question: question
	};
};
