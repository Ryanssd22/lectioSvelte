let wasmModule = null;

export async function loadLectio() {
	if (!wasmModule) {
		const wasm = await import('lectio');
		await wasm.default();
		wasmModule = wasm;
	}
	return wasmModule;
}
