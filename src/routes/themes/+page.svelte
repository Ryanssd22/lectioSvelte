<!-- make it so that the user can either input in a raw hex code, rgb, or the name of a color even to seed the scheme generator-->

<script>
	import { onMount } from 'svelte';

	let activeTab = 'preset';

	function showPreset() {
	    activeTab = 'preset';
	}

	function showCustom() {
	    activeTab = 'custom';
	}

	let liturgicalThemes = ['theme-white', 'theme-green', 'theme-purple', 'theme-red', 'theme-rose'];

	let themes = [];

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

<div class="{currentTheme}">
<div class="flex justify-center mb-4 gap-4">
	<button
		class = "px-4 py-4 rounded-lg font-semibold transition-colors"
		class:selected={activeTab === 'preset'}
		on:click={showPreset}
		style="background-color: var(--accent-color); color: var(--bg-color);cursor:pointer;"
	>
		Preset Themes
	</button>

	<button
		class="px-4 py-2 rounded-lg font-semibold transition-colors"
		class:selected={activeTab === 'custom'}
		on:click={showCustom}
		style="background-color: var(--accent-color); color: var(--bg-color); cursor:pointer;"
	>
		Custom Theme
	</button>

</div>
</div>


{#if activeTab === 'preset'}
<h1 class="mt-8 mb-4 text-4xl leading-none tracking-tight text-gray-800 md:text-5xl">Default</h1>

<div class="section themes fullWidth">
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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

{/if}

{#if activeTab === 'custom'}

{/if}



<!-- testing -->
<!-- <div
	class="{currentTheme} shadow-lg select-none hover:scale-108 active:scale-100"
	style="backgroun==d-color: var(--color-primary)"
>
	hello world
</div> -->

<style>
	.custom-grid {
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
	.selected {
	    outline: 2px solid var(--accent-color);
	}
</style>
