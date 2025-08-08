// SUMMA API
// Send in params part, treatise, question, and articles
// If sends in nothing, it will send you the four parts
// If you send in part, it will send you its treatises
// If you send in treatise, it will send you its questions and subtreatises
// If you send in question, it will send you its articles and its description
// If you send in article, it will send you the full text

import FP from '$lib/data/summa/FP.json';
import FS from '$lib/data/summa/FS.json';
import SS from '$lib/data/summa/SS.json';
import TP from '$lib/data/summa/TP.json';
import FPHead from '$lib/data/summa/FPHead.json';
import SSHead from '$lib/data/summa/SSHead.json';
import FSHead from '$lib/data/summa/FSHead.json';
import TPHead from '$lib/data/summa/TPHead.json';
import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

// const SUMMA = { FP: FP, FS: FS, SS: SS, TP: TP };
// const SUMMA_CONDENSED = condense_summa(SUMMA);

const SUMMA_PARTS = {
	FP: FP,
	FS: FS,
	SS: SS,
	TP: TP
};

const SUMMA_HEADS = {
	FP: FPHead,
	FS: FSHead,
	SS: SSHead,
	TP: TPHead
};

// Part details
const SUMMA_PARTS_DETAILS = {
	FP: { title: 'First Part', link: 'FP', latin: 'Prima Pars' },
	FS: {
		title: 'First Part of the Second Part',
		link: 'FS',
		latin: 'Prima Secundae'
	},
	SS: {
		title: 'Second Part of the Second Part',
		link: 'SS',
		latin: 'Secunda Secundae'
	},
	TP: { title: 'Third Part', link: 'TP', latin: 'Tertia Pars' }
};

// Sent with part param
const SUMMA_PARTS_SEARCH = {
	FP: { treatises: get_simple_treatises(FPHead), ...SUMMA_PARTS_DETAILS.FP },
	FS: {
		treatises: get_simple_treatises(FSHead),
		...SUMMA_PARTS_DETAILS.FS
	},
	SS: {
		treatises: get_simple_treatises(SSHead),
		...SUMMA_PARTS_DETAILS.SS
	},
	TP: { treatises: get_simple_treatises(TPHead), ...SUMMA_PARTS_DETAILS.TP }
};

// Sent with treatise param
const SUMMA_TREATISE = structuredClone(SUMMA_PARTS_SEARCH);
Object.values(SUMMA_TREATISE).forEach((part) => {
	part.treatises = get_treatises(SUMMA_HEADS[part.link], SUMMA_PARTS[part.link]);
});
// console.dir(SUMMA_TREATISE.SS.treatises, { depth: null });

export const GET = ({ url }) => {
	const params = url.searchParams;

	let part = params?.get('part');
	const treatise = params?.get('treatise');
	const question = params?.get('question');
	const article = params?.get('article');

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
		if (article) {
			verify_article(article, question, treatise, part);
		}
	} catch (err) {
		return error(400, err.message);
	}

	if (part && treatise && question && article) {
		return json(get_article(part, treatise - 1, question - 1, article - 1));
	} else if (part && treatise && question) {
		return json(get_question(part, treatise - 1, question - 1));
	} else if (part && treatise) {
		return json(SUMMA_TREATISE[part].treatises[treatise - 1]);
		// return json(SUMMA_PARTS[part]);
	} else if (part) {
		return json(SUMMA_PARTS_SEARCH[part]);
	}

	return json(SUMMA_PARTS_DETAILS);
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

	if (treatise > SUMMA_TREATISE[part].treatises.length || treatise < 1) {
		throw new Error(`Not a valid treatise (1 - ${SUMMA_TREATISE[part].treatises.length})`);
	}
}

function verify_question(question, treatise, part) {
	if (!part) {
		throw new Error('Need to specify part');
	}
	if (!treatise) {
		throw new Error('Need to specify treatise');
	}

	if (question > SUMMA_TREATISE[part].treatises[treatise - 1]['questions'].length || question < 1) {
		throw new Error(
			`Not a valid question (1 - ${SUMMA_TREATISE[part].treatises[treatise - 1]['questions'].length})`
		);
	}
}

function verify_article(article, question, treatise, part) {
	if (!part) {
		throw new Error('Need to specify part');
	}
	if (!treatise) {
		throw new Error(`Need to specify treatise, ${treatise}`);
	}
	if (!question) {
		throw new Error('Need to specify question');
	}

	const articleLength = get_question(part, treatise - 1, question - 1).articles.length;
	if (article > articleLength || article < 1) {
		throw new Error(`Not a valid article (1 - ${articleLength})`);
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

// Pass in headers to get a simple array of treatises. These only include the header, not any of the questions
function get_simple_treatises(head) {
	let treatises = [];
	for (const header of head) {
		if (header.title == 'treatise') {
			treatises.push(header.header);
		}
	}
	return treatises;
}

// Pass in headers to get an array of treatises. These include the treatises questions and their subheaders
// {treatises: [ {treatise: "", questions: [ "", ], subs: [ { sub: "", start: 1 } ] } ]} ]}
function get_treatises(head, questions) {
	let treatises = [];
	for (const header of head) {
		const start = Number(header.range.start);
		const end = Number(header.range.end);

		if (header.title == 'treatise') {
			let questionsArray = [];
			for (let i = start - 1; i < end; i++) {
				questionsArray.push(questions[i].question);
			}
			treatises.push({
				treatise: header.header,
				questions: questionsArray,
				start: start,
				end: end
			});
		} else {
			for (let treatise of treatises) {
				if (start < treatise.end) {
					if (!treatise.subs) {
						treatise.subs = [];
					}
					treatise.subs.push({
						sub: header.header,
						start: start - treatise.start + 1,
						end: end - treatise.start + 1
					});
				}
			}
		}
	}
	return treatises;
}

function get_question(part, treatise, question) {
	let treatiseDetails = SUMMA_TREATISE[part].treatises[treatise];
	let articles = SUMMA_PARTS[part][question].articles;
	let description = SUMMA_PARTS[part][question].description;
	let simplifiedArticles = [];
	for (const article of articles) {
		simplifiedArticles.push(article.article);
	}

	let questionObj = {
		treatise: treatiseDetails.treatise,
		question: treatiseDetails.questions[question],
		articles: simplifiedArticles,
		description: description
	};
	if (treatiseDetails.subs) {
		for (const sub of treatiseDetails.subs) {
			if (question + 1 >= sub.start && question + 1 <= sub.end) {
				questionObj.sub = sub.sub;
			}
		}
	}

	return questionObj;
}

function get_article(part, treatise, question, article) {
	const questionDetails = get_question(part, treatise, question);
	const articleDetails = SUMMA_PARTS[part][question].articles[article];

	let articleObj = { ...articleDetails, treatise: questionDetails.treatise };
	if (questionDetails.sub) {
		articleObj.sub = questionDetails.sub;
	}
	return articleObj;
}
