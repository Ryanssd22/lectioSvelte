// SUMMA API
import FP from '$lib/data/summa/FP.json';
import FS from '$lib/data/summa/FS.json';
import SS from '$lib/data/summa/SS.json';
import TP from '$lib/data/summa/TP.json';
import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

const SUMMA = { FP: FP, FS: FS, SS: SS, TP: TP };
const SUMMA_CONDENSED = condense_summa(SUMMA);

export const GET = ({ url }) => {
	const params = url.searchParams;

	let part = params?.get('part');
	const treatise = params?.get('treatise');
	const question = params?.get('question');

	try {
		if (part) {
			part = part.toUpperCase();
			verify_part(part);
		}
		if (treatise) {
			verify_treatise(treatise, part);
		}
		if (question) {
			verify_question(question, treatise, part);
		}
	} catch (err) {
		return error(400, err.message);
	}

	if (part && treatise && question) {
		return json(SUMMA[part][treatise - 1]['articles'][question - 1]);
	} else if (part && treatise) {
		return json(SUMMA[part][treatise - 1]);
	} else if (part) {
		return json(SUMMA[part]);
	}

	return json(SUMMA_CONDENSED);
};

function verify_part(part) {
	const parts = ['FP', 'FS', 'SS', 'TP'];
	if (!parts.includes(part)) {
		throw new Error(`Not a valid summa part: ${part}`);
	}
}

function verify_treatise(treatise, part) {
	if (!part) {
		throw new Error('Need to specify part');
	}

	if (treatise > SUMMA[part].length || treatise < 1) {
		throw new Error(`Not a valid treatise (1 - ${SUMMA[part].length})`);
	}
}

function verify_question(question, treatise, part) {
	if (!part) {
		throw new Error('Need to specify part');
	}
	if (!treatise) {
		throw new Error('Need to specify treatise');
	}

	if (question > SUMMA[part][treatise - 1]['articles'].length || question < 1) {
		throw new Error(`Not a valid question (1 - ${SUMMA[part][treatise - 1]['articles'].length})`);
	}
}

function condense_summa(summa) {
	let condensedSumma = structuredClone(SUMMA);
	for (const part of ['FP', 'FS', 'SS', 'TP']) {
		for (const [i, article] of condensedSumma[part].entries()) {
			for (const [j, question] of article['articles'].entries()) {
				condensedSumma[part][i]['articles'][j] = { question: question['question'] };
			}
		}
	}

	return condensedSumma;
}
