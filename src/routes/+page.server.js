// import { browser } from '$app/environment';
// import init, { wasm_generate_liturgy } from '$lib/lectio-pkg/lectio_wasm';
// import { onMount } from 'svelte';
// import init, { wasm_generate_liturgy } from '$lib/lectio-pkg/lectio_wasm.js';
// import wasmUrl from '/lectio_wasm_bg.wasm?url';
// export async function load() {
// const today = new Date();
// const options = {
// 	year: 'numeric',
// 	month: 'long',
// 	day: 'numeric',
// 	weekday: 'long'
// };
// const formattedDate = today.toLocaleDateString('en-US', options);
// const wasmResponse = await fetch('/lectio_wasm_bg.wasm');
// const wasmBytes = await wasmResponse.arrayBuffer();
//
// await init({ module: wasmBytes });
// const reading = wasm.instance.exports.wasm_generate_liturgy('2025-06-26', 'NABRE');
// return {
// 	today: formattedDate,
// 	test: 'HELLO WORLD'
// };
// }
// import { readFile } from 'fs/promises';
// import { join } from 'path';
// import init from '$lib/lectio-pkg/lectio_wasm.js';

// export async function load() {
// 	const today = new Date();
// 	const options = {
// 		year: 'numeric',
// 		month: 'long',
// 		day: 'numeric',
// 		weekday: 'long'
// 	};
// 	const formattedDate = today.toLocaleDateString('en-US', options);
//
// 	try {
// 		const wasm = await setupWasm();
// 		const reading = wasm.wasm_generate_liturgy('2025-06-26', 'NABRE');
// 		return {
// 			reading: reading,
// 			today: formattedDate
// 		};
// 	} catch (error) {
// 		console.error('WASM loading error:', error);
// 		return {
// 			reading: 'Error loading liturgical reading',
// 			today: formattedDate
// 		};
// 	}
// }

// async function setupWasm() {
// 	// Load WASM file from the static directory
// 	const wasmPath = join(process.cwd(), 'static', 'lectio_wasm_bg.wasm');
// 	const wasmBytes = await readFile(wasmPath);
// 	return await init({ module: wasmBytes });
// }
