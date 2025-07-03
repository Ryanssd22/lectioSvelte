<!-- make it so that the user can either input in a raw hex code, rgb, or the name of a color even to seed the scheme generator-->

<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let liturgicalThemes = [];

	let whiteTheme = {
		primary: '#FFFEF2',
		secondary: '#CBB06A',
		tertiary: '#D8D8D6',
		title: 'White',
		class: 'theme-white'
	};

	let greenTheme = {
		primary: '#336958',
		secondary: '#CBB06A',
		tertiary: '#7c9993',
		title: 'Green',
		class: 'theme-green'
	};

	let purpleTheme = {
		primary: '#2F195F',
		secondary: '#CBB06A',
		tertiary: '#7353BA',
		title: 'Purple',
		class: 'theme-purple'
	};

	let redTheme = {
		primary: '#9a122d',
		secondary: '#CBB06A',
		tertiary: '#d9686d',
		title: 'Red',
		class: 'theme-red'
	};

	let roseTheme = {
		primary: '#b35cb5',
		secondary: '#CBB06A',
		tertiary: '#f6bcf7',
		title: 'Rose',
		class: 'theme-rose'
	};

	liturgicalThemes.push(whiteTheme, greenTheme, purpleTheme, redTheme, roseTheme);

	let currentTheme = $state(liturgicalThemes[4]);
	let currentName = $state(currentTheme.class);

	function chooseTheme(i) {
		let theme = liturgicalThemes[i];
		console.log('Selected theme: ', theme);
		currentTheme = theme;
		currentName = theme.class;
		localStorage.setItem('theme', i);
	}

	let ready = $state(false);
	onMount(() => {
		let theme = localStorage.getItem('theme');
		console.log(theme);
		// localStorage.setItem('theme', '0');
		chooseTheme(theme);
		ready = true;
	});
</script>

<h1 class="mt-8 mb-4 text-4xl leading-none tracking-tight text-gray-800 md:text-5xl">Default</h1>

<div class="section themes fullWidth">
	<div class="grid">
		{#each liturgicalThemes as theme, i}
			<div
				class="themeButton group flex flex-col rounded-full shadow-lg transition-all select-none hover:scale-108 active:scale-100"
				on:click={() => {
					chooseTheme(i);
				}}
				style="
		background-color: {theme.primary};
		color: {theme.tertiary};
		border-radius: 0.5rem;
		"
			>
				{theme.title}

				<div
					class="mt-2 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
				>
					<div class="h-4 w-4 rounded-full" style="background-color: {theme.secondary}"></div>
					<div class="h-4 w-4 rounded-full" style="background-color: {theme.tertiary}"></div>
				</div>
			</div>
		{/each}
	</div>
</div>

<h1 class="mt-8 mb-4 text-4xl leading-none tracking-tight text-gray-800 md:text-5xl">Themes</h1>

{#if ready}
	<div transition:fade class="section themes fullWidth {currentName}">
		<div class="grid">
			{#each liturgicalThemes as theme, i}
				<div
					class="themeButton group flex flex-col rounded-full shadow-lg transition-all select-none hover:scale-108 active:scale-100"
					on:click={() => {
						chooseTheme(theme);
					}}
					style="
		background-color: var(--color-primary);
		color: var(--color-tertiary);
		border-radius: 0.5rem;
		"
				>
					TESTING

					<div
						class="mt-2 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
					>
						<div
							class="h-4 w-4 rounded-full"
							style="background-color: var(--color-secondary)"
						></div>
						<div class="h-4 w-4 rounded-full" style="background-color: var(--color-tertiary)"></div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

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
