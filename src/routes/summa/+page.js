// Summa loader

export const load = async ({ fetch }) => {
	const summa = await (await fetch('/api/summa')).json();
	const summaParts = [
		{ title: 'First Part', part: summa.FP, link: 'FP' },
		{ title: 'First Part of the Second Part', part: summa.FS, link: 'FS' },
		{ title: 'Second Part of the Second Part', part: summa.SS, link: 'SS' },
		{ title: 'Third Part', part: summa.TP, link: 'TP' }
	];

	return {
		summaParts: summaParts
	};
};
