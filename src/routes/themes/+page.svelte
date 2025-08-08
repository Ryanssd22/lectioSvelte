<!-- themes/+page.svelte -->

<script>
	import { onMount, onDestroy } from 'svelte';
	import { themes, currentTheme } from '$lib/themes/themes.svelte.js';

	console.log('themes object: ', currentTheme);
	let theme = currentTheme
	console.log(theme);

	function changeTheme(newTheme) {
		currentTheme.theme = newTheme;
		localStorage.setItem('currentTheme', JSON.stringify(newTheme));
	    const element = document.body;
	    element.style.setProperty('--primary-color', newTheme.primary);
	    element.style.setProperty('--primary-variant-color', newTheme["primary-variant"]);
	    element.style.setProperty('--secondary-color', newTheme.secondary);
	    element.style.setProperty('--background-color', newTheme.background);
	    element.style.setProperty('--background-variant-color', newTheme["background-variant"]);
	    element.style.setProperty('--text-color', newTheme.text);
	    element.style.setProperty('--text-variant-color', newTheme["text-variant"]);
	}

	function loadTheme() {
		currentTheme.theme = JSON.parse(localStorage.getItem('currentTheme'));
	}

	//tabs on the page
	let tabs = ['preset', 'custom'];
	let activeTab = tabs[0];

	//all subject to change
	function loadTab() {
		const saved = localStorage.getItem('activeTab');
		if (saved && tabs.includes(saved)) {
			activeTab = saved;
			console.log('Loaded tab:', activeTab);
		}
	}

	function chooseTab(tab) {
		console.log('choosing tab');
		activeTab = tab
		saveTab(tab);
	}

	function saveTab(tab) {
	    console.log('saving tab');
	    localStorage.setItem('activeTab', tab);
	}

	onMount(() => {
		loadTab();
	});
</script>




<div class="justify-content grid cursor-pointer grid-cols-2 justify-center gap-2">
	{#each tabs as tab}
		<div
			class="group flex h-16 w-20 items-center justify-center rounded-lg border shadow-lg transition-transform duration-200 hover:scale-[1.08] bg-background-variant text-primary"
			onclick={() => chooseTab(tab)}
		>
			{tab}
		</div>
	{/each}
</div>


<div>


{#if activeTab == 'preset'}
    <h1 class="text-4xl">Default Themes</h1>
    <div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
	{#each themes as theme (theme.title)}
	    <button
		onclick={() => changeTheme(theme)}
		class="group relative h-16 w-32 cursor-pointer rounded-lg shadow-lg
		transition-transform duration-200 hover:scale-[1.08]
		active:scale-100"
		style="
		background-color: {theme.primary};
		color: {theme.text};
		display: flex;
		align-items: center;
		justify-content: center;"
	    >
		<span class="transition-opacity duration-200 group-hover:opacity-0">
		    {theme.title}
		</span>
		<div
		    class="absolute inset-0 flex items-center justify-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		>
		    {#each [theme["primary-variant"], theme.secondary, theme.background, theme["background-variant"], theme.text] as color}
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

{#if activeTab == 'custom'}
    <h1 class="text-4xl">Custom Theme</h1>
    <p>Here is some custom content for the second tab.</p>
{/if}
</div>

<!-- <style> -->
<!-- 	.themeButton { -->
<!-- 	} -->
<!-- 	.selected { -->
<!-- 		outline: 5px solid var(--color-primary); -->
<!-- 	}ch -->
<!-- </style> -->
