//Summa loader for treatise
//Lists out all questions concerning treatise

export const load = async ({ fetch, params }) => {
	const { part, treatise } = params;
	const treatiseJSON = await (await fetch(`/api/summa?part=${part}&treatise=${treatise}`)).json();

	return {
		treatise: treatiseJSON,
		treatiseIndex: treatise
	};
};
