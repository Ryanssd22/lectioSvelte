//Summa loader for questions

export const load = async ({ fetch, params }) => {
	const { part, treatise, question } = params;
	const questionJSON = await (
		await fetch(`/api/summa?part=${part}&treatise=${treatise}&question=${question}`)
	).json();

	return {
		question: questionJSON
	};
};
