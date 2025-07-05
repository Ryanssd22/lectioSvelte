<!-- make it so that the user can either input in a raw hex code, rgb, or the name of a color even to seed the scheme generator-->

<script>
	import { onMount } from 'svelte';

	let liturgicalThemes = ['theme-white', 'theme-green', 'theme-purple', 'theme-red', 'theme-rose'];

	let currentTheme = $state(null);
	//local storage handled here

	async function saveTheme(theme) {
		localStorage.setItem('selectedTheme', theme);

		const cache = await caches.open('theme-cache');
		const response = new Response(theme, {
			headers: { 'Content-Type': 'text/plain' }
		});

		await cache.put('/cached-theme', response);
	}

	async function loadTheme() {
		const cache = await caches.open('theme-cache');
		const cachedResponse = await cache.match('/cached-theme');

		if (cachedResponse) {
			const cachedTheme = await cachedResponse.text();
			if (liturgicalThemes.includes(cachedTheme)) {
				console.log('Loaded theme from cache: ', cachedTheme);
				return cachedTheme;
			}
		}

		const local = localStorage.getItem('selectedTheme');
		if (local && liturgicalThemes.includes(local)) {
			console.log('Loaded theme from localStorage:', local);
			return local;
		}

		console.log('Using default theme');
		return 'theme-white';
	}

	function chooseTheme(theme) {
		console.log('Selected theme: ', theme);
		currentTheme = theme;

		//local storage handled here
		saveTheme(theme);
	}

	onMount(async () => {
		currentTheme = await loadTheme();
	});
</script>

<h1 class="mt-8 mb-4 text-4xl leading-none tracking-tight text-gray-800 md:text-5xl">Default</h1>

<div class="section themes fullWidth">
	<div class="grid">
		{#each liturgicalThemes as theme, i}
			<div
				class="{theme} themeButton group flex flex-col rounded-full shadow-lg transition-all select-none hover:scale-108 active:scale-100"
				on:click={() => {
					chooseTheme(theme);
				}}
				style="
		background-color: var(--color-primary);
		color: var(--color-tertiary);
		border-radius: 0.5rem;
		"
			>
				{theme}

				<div
					class="mt-2 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
				>
					<div class="h-4 w-4 rounded-full" style="background-color: var(--color-secondary)"></div>
					<div class="h-4 w-4 rounded-full" style="background-color: var(--color-tertiary)"></div>
				</div>
			</div>
		{/each}
	</div>
</div>

<h1 class="mt-8 mb-4 text-4xl leading-none tracking-tight text-gray-800 md:text-5xl">Themes</h1>

<div
	class="{currentTheme} shadow-lg select-none hover:scale-108 active:scale-100"
	style="background-color: var(--color-primary)"
>
	hello world
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(5, 100px);
		gap: 34px;
	}

	.themeButton {
		background-color: red;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
</style>
