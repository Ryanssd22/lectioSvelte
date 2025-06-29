import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [wasm(), topLevelAwait(), tailwindcss(), sveltekit(), Icons({ compiler: 'svelte' })],
	optimizeDeps: {
		exclude: ['$lib/lectio-pkg/lectio_wasm.js']
	},
	assetsInclude: ['**/*.wasm'],
	define: {
		global: 'globalThis'
	}
});
