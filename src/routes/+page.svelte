<script>
	import MaterialSymbolsArrowLeftAltRounded from '~icons/material-symbols/arrow-left-alt-rounded';
  import MaterialSymbolsArrowRightAltRounded from '~icons/material-symbols/arrow-right-alt-rounded';
  import SvgSpinners270RingWithBg from '~icons/svg-spinners/270-ring-with-bg';

  import { fly } from 'svelte/transition';

	import { browser } from '$app/environment';
	import init, { wasm_generate_liturgy } from '$lib/lectio-pkg/lectio_wasm';
	import { onMount } from 'svelte';

	let date = $state(new Date(Date.now()));
	let formattedDate = $state(formatDate());
	let translation = $state('NABRE');
	let readingIndex = $state(0);

	let liturgy = $state(null);
	let parsedLiturgy = $derived(liturgy ? JSON.parse(liturgy) : null);
	let multipleReadings = $derived(parsedLiturgy?.length > 1 ? true : false);
  let mounted = $state(false);
  let loaded = $derived(mounted && parsedLiturgy);
	onMount(async () => {
    mounted = true;
		if (browser) {
			try {
				// await initWasm();
				await init({
					module_or_path: '/lectio_wasm_bg.wasm'
				});
				// const importObject = {
				//   my_namespace: { imported_func: (arg) => console.log(arg) },
				// };
				// const wasmModule = await WebAssembly.instantiateStreaming(fetch('/lectio_wasm_bg.wasm'), importObject);
				// const { wasm_generate_liturgy } = wasmModule.instance.exports;
				liturgy = wasm_generate_liturgy(formatDateForLiturgy(), translation);
			} catch (error) {
				console.log('Failed to initialize WASM module:', error);
			}
		}
	});

	// async function initWasm() {
	//   try {
	//     const cache = await caches.open("wasm-cache");
	//     let response = await cache.match("/lectio_wasm_bg.wasm");
	//
	//     if (!response) {
	//       console.log("WASM not in cache, fetching...");
	//       response = await fetch("/lectio_wasm_bg.wasm");
	//       await cache.put("/lectio_wasm_bg.wasm", response.clone());
	//     } else {
	//       console.log("WASM successfully loaded from cache");
	//     }
	//
	//     const wasmBytes = await response.arrayBuffer();
	//     await init({ module: wasmBytes });
	//   } catch (error) {
	//     console.log("WASM cache failed: ", error);
	//     await init({ module_or_path: "/lectio_wasm_bg.wasm" });
	//   }
	// }
	async function initWasm() {
		try {
			const cache = await caches.open('wasm-cache');
			let response = await cache.match('/lectio_wasm_bg.wasm');

			if (!response) {
				console.log('WASM not in cache, fetching...');
				response = await fetch('/lectio_wasm_bg.wasm');

				// Check if fetch was successful
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				await cache.put('/lectio_wasm_bg.wasm', response.clone());
				console.log('WASM fetched and cached');
			} else {
				console.log('WASM successfully loaded from cache');
			}

			const wasmBytes = await response.arrayBuffer();
			await init({ module: wasmBytes });
			console.log('WASM initialized successfully');
		} catch (error) {
			console.log('WASM cache failed: ', error);
			try {
				await init();
				console.log('WASM initialized with fallback method');
			} catch (fallbackError) {
				console.error('Both WASM initialization methods failed:', fallbackError);
				throw fallbackError;
			}
		}
	}

	function formatDateForLiturgy() {
		let year = date.getFullYear();
		let day = date.getDate().toString();
		let month = (date.getMonth() + 1).toString();
		return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
	}

	function formatDate() {
		let month = date.toLocaleDateString('en-us', { month: 'long' });
		let day = date.getDate();
		let year = date.getFullYear();
		return `${day} ${month} ${year}`;
	}
  let titleFly = $state(5);
	function datePrev() {
    titleFly = -5;
		date.setDate(date.getDate() - 1);
		updateLiturgy();
	}
	function dateNext() {
    titleFly = 5;
		date.setDate(date.getDate() + 1);
		updateLiturgy();
	}
	function updateLiturgy() {
		formattedDate = formatDate();
		liturgy = wasm_generate_liturgy(formatDateForLiturgy(), translation);
	}

	let title = $derived.by(() => {
		if (liturgy) {
			return parsedLiturgy[readingIndex].title;
		} else {
			return '';
		}
	});
	let firstReading = $derived.by(() => {
		if (liturgy) {
			return parsedLiturgy[readingIndex].first;
		} else {
			return '';
		}
	});

	$effect(() => {
		console.log(firstReading);
		console.log(formatDateForLiturgy());
	});
</script>

{#if !loaded}
  <div out:fly={{ duration:200 }} class="absolute text-xl">
    <SvgSpinners270RingWithBg class="my-10 size-10 text-amber-300"/>
  </div>
{:else}
  <div in:fly={{ delay: 200 }} class="flex flex-col justify-center items-center w-full">
    <!-- Reading Heading -->
    <div class="rounded-lg bg-amber-100 flex h-20 w-full flex-row items-center justify-between sm:w-5/6">
      <button
        onclick={datePrev}
        class="arrowButton group"
      >
        <MaterialSymbolsArrowLeftAltRounded class="arrowIcon group-active:scale-90" />
      </button>
      <div>
        <div class="h-10 flex items-center justify-center">
          {#key title}
            <h1 in:fly={{ duration: 100, delay: 100, y: titleFly }} out:fly={{ duration: 100, y: -titleFly}} class="absolute text-3xl font-semibold">{title}</h1>
          {/key}
        </div>
        <p>{formattedDate}</p>
      </div>
      <button onclick={dateNext} class="arrowButton group">
        <MaterialSymbolsArrowRightAltRounded class="arrowIcon group-active:scale-90"/>
      </button>
    </div>

    <div>
      {#if multipleReadings}
        <p>Multiple Readings</p>
      {/if}
      {#if firstReading != ''}
        <h2 class="text-xl font-semibold">First Reading</h2>
        <p>{firstReading.rawReading}</p>
        {#each firstReading.reading[0].verses as verse}
          <p>{verse.chapter}:{verse.verse}</p>
          <p>{verse.translation}</p>
        {/each}
      {/if}
    </div>
  </div>
{/if}
