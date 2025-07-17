// tailwind.config.js
module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}' // adjust to your file types and folders
	],
	theme: {
		extend: {
			colors: {
		primary: 'var()',
		secondary: 'var()',
		tertiary: 'var()',
	    },
	},
	},
	plugins: [require('daisyui')],
	safelist: ['fill-red-500', 'fill-blue-400', 'fill-green-300', 'fill-amber-500', 'fill-amber-400', 'group-hover:opacity-100', 'opacity-0']
};
