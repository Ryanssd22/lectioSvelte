//Summa loader for articles

export const load = async ({ fetch, parent }) => {
	const { part, treatise, question, article } = await parent();
	const articleJSON = await (
		await fetch(
			`/api/summa?part=${part}&treatise=${treatise}&question=${question}&article=${article}`
		)
	).json();

	return {
		articleJSON: articleJSON
	};
};
