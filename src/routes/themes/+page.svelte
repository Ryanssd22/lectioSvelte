<!-- make it so that the user can either input in a raw hex code, rgb, or the name of a color even to seed the scheme generator-->

<script>
	import { onMount } from 'svelte';

	function showPreset() {
	    activeTab = 'tab-1';
	    localStorage.setItem('activeTab', 'tab-1');
	}

	function showCustom() {
	    activeTab = 'tab-2';
	    localStorage.setItem('activeTab', 'tab-2');
	}

	let liturgicalThemes = ['theme-white', 'theme-green', 'theme-purple', 'theme-red', 'theme-rose'];

	let themes = [];
	let tabs = ['tab-1', 'tab-2'];
	const tabLabels = {
		'tab-1': 'Preset Themes',
		'tab-2': 'Custom Theme'
	};

	let activeTab = null;
	let currentTheme = null;
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
		if (tabs.includes(cachedTab)) {
		    console.log('Loaded tab from cache', cachedTab);
		    return cachedTab;
		}
	    }

	    const local = localStorage.getItem('activeTab');
	    if (local && tabs.includes(local)) {
    		console.log('Loaded tab from localStorage:', local);
	    	return local;
	    }

	    console.log('Using default tab');
	    return 'tab-1';
	}

	function chooseTheme(theme) {
		console.log('Selected theme: ', theme);
		currentTheme = theme;

		//local storage handled here
		saveTheme(theme);
	}
	function chooseTab(tab) {
		console.log('Selected tab: ', tab);
		activeTab = tab;

		//local storage handled here
		saveTab(tab);
	}

	onMount(async () => {
		activeTab = await loadTab();
		currentTheme = await loadTheme();
	});


	let hexInput = "";
	let isValidHex = true;
	let showPopup = false;

	let primaryHexInput = "";
	let secondaryHexInput = "";
	let tertiaryHexInput = "";

	function validateHex(event) {
	    let raw = event.target.value.toUpperCase();
	    
	    // Always start with #
	    if (!raw.startsWith("#")) {
		raw = "#" + raw;
	    }
	    
	    // Strip to # + 6 characters max
	    if (raw.length > 7) {
		raw = raw.slice(0, 7);
	    }
	    
	    hexInput = raw;
	    
	    const hexPattern = /^#([0-9A-F]{6})$/;
	    isValidHex = hexPattern.test(hexInput);
	    showPopup = !isValidHex && hexInput.length === 7;
	}

</script>

<div class="{currentTheme}">
<div class="flex justify-center mb-4 gap-4">
	{#each tabs as tab}
		<button
			class={`px-4 py-4 rounded-lg font-semibold transition-colors duration-200
				${activeTab === tab 
					? 'ring-2 ring-[var(--accent-color)] opacity-100' 
					: 'opacity-50'
				}`}
			on:click={() => chooseTab(tab)}
			style="background-color: var(--accent-color); color: var(--bg-color); cursor:pointer;"
		>
			{tabLabels[tab]}
		</button>
	{/each}
</div>


{#if activeTab === 'tab-1'}
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

{#if activeTab === 'tab-2'}
	<h2 class="mt-8 mb-4 text-4xl leading-none tracking-tight text-gray-800 md:text-5xl">
		Custom Theme (rrggbb)
	</h2>
	<div class="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center-safe">

	    <div class="flex items-center gap-2">
	    <input 
		id="primaryHexInput"
		class ="w-45 flex-grow rounded-md border border-gray-300 text-gray-800 placeholder-gray-400 px-1 py-1"
		type="text"
		pattern="^#(?:[0-9a-fA-F]{3}){1,2}$"
		bind:value={primaryHexInput}
		on:input={(e) => validateHex(e, val => primaryHexInput = val)}
		placeholder="Primary color"
		style="text-transform: uppercase;"
	    />
	    <input 
		class ="w-10 h-10 px-2 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400"
		type="color"
		placeholder="Primary color"
	    />
	    </div>


	    <div class="flex items-center gap-2">
	    <input 
		id="secondaryHexInput"
		class ="w-45 flex-grow rounded-md border border-gray-300 text-gray-800 placeholder-gray-400 px-1 py-1"
		type="text"
		pattern="^#(?:[0-9a-fA-F]{3}){1,2}$"
		bind:value={secondaryHexInput}
		on:input={validateHex}
		placeholder="Secondary color"
		style="text-transform: uppercase;"
	    />
	    <input 
		class ="w-10 h-10 px-2 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400"
		type="color"
		placeholder="Secondary color"
	    />
	    </div>


	    <div class="flex items-center gap-2">
	    <input 
		id="tertiaryHexInput"
		class ="w-45 flex-grow rounded-md border border-gray-300 text-gray-800 placeholder-gray-400 px-1 py-1"
		type="text"
		pattern="^#(?:[0-9a-fA-F]{3}){1,2}$"
		bind:value={tertiaryHexInput}
		on:input={validateHex}
		placeholder="Tertiary color"
		style="text-transform: uppercase;"
	    />
	    <input 
		class ="w-10 h-10 px-2 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400"
		type="color"
		placeholder="Tertiary color"
	    />
	    </div>


	    <div class="flex items-center gap-2">
	    <input 
		id="textHexInput"
		class ="w-45 flex-grow rounded-md border border-gray-300 text-gray-800 placeholder-gray-400 px-1 py-1"
		type="text"
		pattern="^#(?:[0-9a-fA-F]{3}){1,2}$"
		on:input={validateHex}
		style="text-transform: uppercase;"
		placeholder="Text color"
	    />
	    <input 
		class ="w-10 h-10 px-2 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400"
		type="color"
		placeholder="Text color"
	    />
	    </div>


	    <div class="flex items-center gap-2">
	    <input 
		id="accentHexInput"
		class ="w-45 flex-grow rounded-md border border-gray-300 text-gray-800 placeholder-gray-400 px-1 py-1"
		type="text"
		pattern="^#(?:[0-9a-fA-F]{3}){1,2}$"
		on:input={validateHex}
		placeholder="Accent color"
		style="text-transform: uppercase;"
	    />
	    <input 
		class ="w-10 h-10 px-2 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400"
		type="color"
		placeholder="Accent color"
	    />
	    </div>


	    <div class="flex items-center gap-2">
	    <input 
		id="bgHexInput"
		class ="w-45 flex-grow rounded-md border border-gray-300 text-gray-800 placeholder-gray-400 px-1 py-1"
		type="text"
		pattern="^#(?:[0-9a-fA-F]{3}){1,2}$"
		on:input={validateHex}
		placeholder="Background color"
		style="text-transform: uppercase;"
	    />
	    <input 
		class ="w-10 h-10 px-2 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400"
		type="color"
		placeholder="Background color"
		style="text-transform: uppercase;"
	    />
	    </div>

	</div>

	<h1 class="mt-8 mb-4 text-4xl leading-none tracking-tight text-gray-800 md:text-5xl"> </h1>


{/if}
</div>


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
	    outline: 5px solid var(--color-primary);
	}
</style>
