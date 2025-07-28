<!-- themes/+page.svelte -->

<script>
	import { onMount, onDestroy } from 'svelte';
	import { themes, currentTheme } from '$lib/stores/themeStore.svelte.js'

	console.log("themes object: ", themes);

	//these are page specific
	let liturgicalThemes = ['theme-white', 'theme-green', 'theme-purple', 'theme-red', 'theme-rose'];

	function changeTheme(newTheme) {
	    currentTheme.theme = newTheme
	    localStorage.setItem("currentTheme",JSON.stringify(newTheme))
	}

	function loadTheme() {
	    currentTheme.theme = JSON.parse(localStorage.getItem("currentTheme"))
	}


	//tabs on the page
	let tabs =['tab1', 'tab2']
	let currentTab = tabs[0]

	const tabLabels = {
		'tab-1': 'Presets',
		'tab-2': 'Custom'
	};

	let activeTab = null

	function showPreset() {
	    activeTab = 'tab-1'
	    localStorage.setItem('activeTab', 'tab-1')
	}

	function showCustom() {
	    activeTab = 'tab-2';
	    localStorage.setItem('activeTab', 'tab-2');
	}

	//all subject to change
	async function saveTab(tab) {
		localStorage.setItem('selectedTab', tab);
		const cache = await caches.open('tab-cache');
		const response = new Response(tab, {
			headers: { 'Content-Type': 'text/plain' }
		});
		await cache.put('/cached-tab', response);
	}

	function loadTab() {
	    const activeTab = localStorage.getItem('activeTab') || 'tab1';
	    return activeTab;
	}

	function chooseTab(tab) {
		activeTab = tab;
		saveTab(tab);
	}


	onMount(() => {
	    activeTab = loadTab();
	    loadTab();
	    loadTheme();
	});

</script>

<!-- <h1> {JSON.stringify(currentTheme.theme)}</h1> -->
<h3> Default Themes </h3>

{#if currentTab == 'tab1'}

    {#each tabs as tab}

    {/each}
    <div class="grid gap-3 grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
	{#each themes as theme}

	    <button onclick = { changeTheme(theme) }
		class="group relative w-32 h-16 rounded-lg cursor-pointer shadow-lg
		transition-transform duration-200 hover:scale-[1.08] duration-200 transition-transform
		active:scale-100"
		style="background-color: {theme.primary}; display: flex; align-items: center; justify-content: center;">
		<span class="transition-opacity duration-200 group-hover:opacity-0">
		    {theme.title}
		</span>
		<div class="absolute inset-0 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
		    {#each [theme.secondary, theme.tertiary, theme.accent, theme.background, theme.text] as color}
			<div class="hover:scale-120 transition-transform w-3 h-3 rounded-full" style="background-color: {color};"></div>
		    {/each}
		</div>
	    </button>    
	{/each}
    </div>
{/if}

{#if currentTab == 'tab2'}

{/if}

<style>
	.themeButton {
	}
	.selected {
		outline: 5px solid var(--color-primary);
	}ch
</style>
