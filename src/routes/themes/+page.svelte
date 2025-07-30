<!-- themes/+page.svelte -->

<script>
	import { onMount, onDestroy } from 'svelte';
	import { themes, currentTheme } from '$lib/stores/themeStore.svelte.js';

	console.log('themes object: ', themes);

	function changeTheme(newTheme) {
		currentTheme.theme = newTheme;
		localStorage.setItem('currentTheme', JSON.stringify(newTheme));
		console.log('changing theme ', newTheme);
		document.documentElement.setAttribute('data-theme', currentTheme.theme.title);
	}

	function loadTheme() {
		currentTheme.theme = JSON.parse(localStorage.getItem('currentTheme'));
	}

	//tabs on the page
	let tabs = ['preset', 'custom'];
	let activeTab = tabs[0];

	//all subject to change
	function saveTab(tab) {
		console.log('saving the tab {}', tab);
		localStorage.setItem('activeTab', tab);
	}

	function loadTab() {
		const saved = localStorage.getItem('activeTab');
		if (saved && tabs.includes(saved)) {
			activeTab = saved;
			console.log('Loaded tab:', activeTab);
		}
	}

	function chooseTab(tab) {
		console.log('choosing tab');
		activeTab = tab;
		saveTab(tab);
	}

	onMount(() => {
		loadTab();
		loadTheme();
	});
</script>

<div class="justify-content grid cursor-pointer grid-cols-2 justify-center gap-2">
	{#each tabs as tab}
		<div
			class="group flex h-16 w-20 items-center justify-center rounded-lg border shadow-lg transition-transform duration-200 hover:scale-[1.08]"
			on:click={() => chooseTab(tab)}
			style="background-color: {currentTheme.secondary}"
		>
			{tab}
		</div>
	{/each}
</div>

{#if activeTab == 'preset'}
	<h1 class="text-4xl">Default Themes</h1>
	<div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
		{#each themes as theme}
			<button
				on:click={() => changeTheme(theme)}
				class="group relative h-16 w-32 cursor-pointer rounded-lg shadow-lg
		transition-transform duration-200 hover:scale-[1.08]
		active:scale-100"
				style="background-color: {theme.primary}; text-color: {theme.text};display: flex; align-items: center; justify-content: center;"
			>
				<span class="transition-opacity duration-200 group-hover:opacity-0">
					{theme.title}
				</span>
				<div
					class="absolute inset-0 flex items-center justify-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				>
					{#each [theme.secondary, theme.tertiary, theme.accent, theme.background, theme.text] as color}
						<div
							class="h-3 w-3 rounded-full transition-transform hover:scale-120"
							style="background-color: {color};"
						></div>
					{/each}
				</div>
			</button>
		{/each}
	</div>
{/if}

{#if activeTab == 'custom'}{/if}

<style>
	.themeButton {
	}
	.selected {
		outline: 5px solid var(--color-primary);
	}ch
</style>
