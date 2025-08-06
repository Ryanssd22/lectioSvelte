//Summa loader for questions

export const load = async ({ fetch, parent }) => {
	const { part, treatise, question } = await parent();
	const questionJSON = await (
		await fetch(`/api/summa?part=${part}&treatise=${treatise}&question=${question}`)
	).json();

	return {
		question: questionJSON
	};
};
