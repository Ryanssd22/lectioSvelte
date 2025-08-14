//Summa loader for treatise
//Lists out all questions concerning treatise

export const load = async ({ fetch, params, parent }) => {
	const { part, treatise } = await parent();
	const treatiseJSON = await (await fetch(`/api/summa?part=${part}&treatise=${treatise}`)).json();

	return {
		treatiseJSON: treatiseJSON,
		treatiseIndex: treatise,
		treatiseTitle: treatiseJSON.treatise
	};
};
