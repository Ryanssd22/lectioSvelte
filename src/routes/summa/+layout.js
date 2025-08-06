// Passes in base summa to Summa layout

export const load = async ({ fetch, params }) => {
	const { part = null, treatise = null, question = null } = params;
	const summa = await (await fetch('/api/summa')).json();
	const summaParts = [
		{ title: 'First Part', part: summa.FP, link: 'FP', latin: 'Prima Pars' },
		{ title: 'First Part of the Second Part', part: summa.FS, link: 'FS', latin: 'Prima Secundae' },
		{
			title: 'Second Part of the Second Part',
			part: summa.SS,
			link: 'SS',
			latin: 'Secunda Secundae'
		},
		{ title: 'Third Part', part: summa.TP, link: 'TP', latin: 'Tertia Pars' }
	];

	return {
		summa: summa,
		summaParts: summaParts,
		part: part,
		treatise: treatise,
		question: question
	};
};
