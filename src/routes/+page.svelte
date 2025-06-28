<script>
	import { browser } from '$app/environment';
	import init, { wasm_generate_liturgy } from '$lib/lectio-pkg/lectio_wasm';
	import { onMount } from 'svelte';

	let date = $state(new Date(Date.now()));
	let formattedDate = $state(formatDate());
	let translation = $state('NABRE');
	let readingIndex = $state(0);

	let liturgy = $state(null);
	let parsedLiturgy = $derived(liturgy ? JSON.parse(liturgy) : null);
	onMount(async () => {
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
      const cache = await caches.open("wasm-cache");
      let response = await cache.match("/lectio_wasm_bg.wasm");
      
      if (!response) {
        console.log("WASM not in cache, fetching...");
        response = await fetch("/lectio_wasm_bg.wasm");
        
        // Check if fetch was successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        await cache.put("/lectio_wasm_bg.wasm", response.clone());
        console.log("WASM fetched and cached");
      } else {
        console.log("WASM successfully loaded from cache");
      }
      
      const wasmBytes = await response.arrayBuffer();
      await init({ module: wasmBytes });
      console.log("WASM initialized successfully");
      
    } catch (error) {
      console.log("WASM cache failed: ", error);      
      try {
        await init(); 
        console.log("WASM initialized with fallback method");
      } catch (fallbackError) {
        console.error("Both WASM initialization methods failed:", fallbackError);
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
	function datePrev() {
		date.setDate(date.getDate() - 1);
		formattedDate = formatDate();
		liturgy = wasm_generate_liturgy(formatDateForLiturgy(), translation);
	}
	function dateNext() {
		date.setDate(date.getDate() + 1);
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

<!-- Reading Heading -->
<div class="flex flex-row items-center justify-around">
	<button onclick={datePrev}>button</button>
	<div>
		<h1 class="text-3xl font-semibold">{title}</h1>
		<p>{formattedDate}</p>
	</div>
	<button onclick={dateNext}>button</button>
</div>

{#if firstReading != ''}
	<h2 class="text-xl font-semibold">First Reading</h2>
	<p>{firstReading.rawReading}</p>
	{#each firstReading.reading[0].verses as verse}
		<p>{verse.chapter}:{verse.verse}</p>
		<p>{verse.translation}</p>
	{/each}
{/if}
<!-- <p>{JSON.stringify(firstReading.reading)}</p> -->

<!-- {#await liturgyPromise} -->
<!-- 	<p>Loading...</p> -->
<!-- {:then liturgy} -->
<!-- 	<p>{liturgy}</p> -->
<!-- {/await} -->
