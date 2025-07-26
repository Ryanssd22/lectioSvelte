<script>
	import { onMount, onDestroy } from 'svelte';
	import { themeStore } from '$lib/stores/themeStore';

	let storeThemes = [
	    'lectio', 
	    'liturgical', 
	    'green', 
	    'white', 
	    'purple', 
	    'red', 
	    'rose'
	];

	let currentStoreTheme = 'lectio';

	let theme;

	const unsubscribe = themeStore.subscribe((value) => {
	    theme = value;
	});

	//these are page specific
	let liturgicalThemes = ['theme-white', 'theme-green', 'theme-purple', 'theme-red', 'theme-rose'];

	//tabs on the page
	let tabs = ['tab-1', 'tab-2'];

	const tabLabels = {
		'tab-1': 'Presets',
		'tab-2': 'Custom'
	};

	let activeTab = null;

	onDestroy(() => unsubscribe());

	function showPreset() {
	    activeTab = 'tab-1';
	    localStorage.setItem('activeTab', 'tab-1');
	}

	function showCustom() {
	    activeTab = 'tab-2';
	    localStorage.setItem('activeTab', 'tab-2');
	}


	async function saveTab(tab) {
		localStorage.setItem('selectedTab', tab);
		const cache = await caches.open('tab-cache');
		const response = new Response(tab, {
			headers: { 'Content-Type': 'text/plain' }
		});
		await cache.put('/cached-tab', response);
	}

	async function loadTab() {
	    const cache = await caches.open('tab-cache');
	    const cachedResponse = await cache.match('/cached-tab');
	    if (cachedResponse) {
	        const cachedTab = await cachedResponse.text();
	        if (tabs.includes(cachedTab)) return cachedTab;
	    }
	    const local = localStorage.getItem('activeTab');
	    if (local && tabs.includes(local)) return local;
	    return 'tab-1';
	}

	function chooseTab(tab) {
		activeTab = tab;
		saveTab(tab);
	}

	function handleColorChange(key, value) {
		themeStore.setColor(key, value);
	}

	onMount(async () => {
		activeTab = await loadTab();
	});

	function applyStoreTheme(themeName) {
		currentStoreTheme = themeName;
		themeStore.setTheme(themeName);
	}

</script>

<div class="{currentStoreTheme}">
	<div class="flex justify-center mb-4 gap-4">
		{#each tabs as tab}
			<button
				class={`px-4 py-4 rounded-lg font-semibold transition-colors duration-200
					${activeTab === tab ? 'ring-2 ring-[var(--accent-color)] opacity-100' : 'opacity-50'}`}
				on:click={() => chooseTab(tab)}
				style="background-color: var(--accent-color); color: var(--bg-color); cursor:pointer;"
			>
				{tabLabels[tab]}
			</button>
		{/each}
	</div>

	{#if activeTab === 'tab-1'}
		<h1 class="mt-8 mb-4 text-4xl leading-none tracking-tight text-gray-800 md:text-5xl">Liturgical Themes</h1>

		<div class="section fullWidth">
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{#each liturgicalThemes as theme}
					<div
						class="{theme} themeButton group flex flex-col rounded-full shadow-lg transition-all select-none hover:scale-108"
						style="background-color: var(--color-primary); color: var(--color-tertiary); border-radius: 0.5rem;"
					>
						{theme}
						<div class="mt-2 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
							<div class="h-4 w-4 rounded-full" style="background-color: var(--color-secondary)"></div>
							<div class="h-4 w-4 rounded-full" style="background-color: var(--color-tertiary)"></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	<h1 class="mt-8 mb-4 text-4xl leading-none tracking-tight text-gray-800 md:text-5xl">Theme Presets</h1>
	
	<div class="mt-8">
	    <div class="flex flex-wrap gap-4">
		{#each storeThemes as themeName}
		    <button
			on:click={() => applyStoreTheme(themeName)}
			class={`aspect-square min-h-[6rem] flex items-center justify-center text-center px-4 py-2 rounded-lg font-medium transition-all duration-200 border cursor-pointer shadow-lg hover:scale-108
${currentStoreTheme === themeName
? 'bg-[var(--accent-color)] text-[var(--bg-color)] border-[var(--accent-color)]'
: 'bg-white text-[var(--accent-color)] border-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-white'}`}
		    >
			<span>{themeName}</span>
		    </button>
		{/each}
	    </div>
	</div>
	{/if}

	{#if activeTab === 'tab-2'}

		<h2 class="mt-8 mb-4 text-4xl leading-none tracking-tight text-gray-800 md:text-5xl">Custom Theme (rrggbb)</h2>
		<h1 class="text-2xl font mb-4">Theme Editor</h1>

		<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
			{#each Object.entries(theme) as [key, value]}
				<div class="flex items-center space-x-4">
					<label class="capitalize w-24" for={key}>{key}:</label>
					<input
						id={key}
						type="color"
						class="w-10 h-10 px-1 py-1 border border-gray-300 rounded-lg text-gray-800"
						value={value}
						on:input={(e) => handleColorChange(key, e.target.value)}
					/>
				</div>
			{/each}
		</div>

		<button
			on:click={() => themeStore.reset()}
			class="mt-6 bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded"
		>
			Reset Theme
		</button>
	{/if}
</div>

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
