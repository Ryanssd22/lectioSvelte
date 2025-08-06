//Summa loader for part
//Lists out all questions concerning treatise

export const load = async ({ params, parent }) => {
	const { summaParts, part } = await parent();

	let partTitle = null;
	let partTitleLatin = null;
	for (const summaPart of summaParts) {
		if (summaPart.link == part) {
			partTitleLatin = summaPart.latin;
			partTitle = summaPart.title;
		}
	}

	return {
		partTitle: partTitle,
		partTitleLatin: partTitleLatin
	};
};
