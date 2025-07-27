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
	let tabs =['tab-1', 'tab-2'];

	const tabLabels = {
		'tab-1': 'Presets',
		'tab-2': 'Custom'
	};

	let activeTab = null;

	function showPreset() {
	    activeTab = 'tab-1';
	    localStorage.setItem('activeTab', 'tab-1');
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

{each themes as theme}


<style>
	.themeButton {
		background-color: red;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.selected {
		outline: 5px solid var(--color-primary);
	}
</style>
