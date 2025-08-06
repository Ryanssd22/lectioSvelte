//Summa loader for part
//Lists out all questions concerning treatise

export const load = async ({ params, parent }) => {
	const { summaParts, part } = await parent();

	let partTitle = null;
	for (const summaPart of summaParts) {
		if (summaPart.link == part) {
			partTitle = summaPart.title;
		}
	}

	return {
		partTitle: partTitle
	};
};
