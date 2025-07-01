<script>
	import SvgSpinners270RingWithBg from '~icons/svg-spinners/270-ring-with-bg';

	import DatePicker from '$lib/components/DatePicker.svelte';
	import ReadingDisplay from '$lib/components/ReadingDisplay.svelte';
	import { SvelteDate } from 'svelte/reactivity';

	import { fly } from 'svelte/transition';

	import { browser } from '$app/environment';
	import init, { wasm_generate_liturgy } from '$lib/lectio-pkg/lectio_wasm';
	import { onMount } from 'svelte';

	let date = $state(new SvelteDate(Date.now()));
	let translation = $state('NABRE');
	let readingIndex = $state(0);

	let mounted = $state(false);
	let liturgy = $derived.by(() => {
		date;
		if (mounted) {
			return wasm_generate_liturgy(formatDateForLiturgy(), translation);
		} else {
			return null;
		}
	});
	let parsedLiturgy = $derived(liturgy ? JSON.parse(liturgy) : null);
	let multipleReadings = $derived(parsedLiturgy?.length > 1 ? true : false);
	let loaded = $derived(mounted && parsedLiturgy);
	onMount(async () => {
		if (browser) {
			try {
				await init({
					module_or_path: '/lectio_wasm_bg.wasm'
				});
				mounted = true;
				liturgy = wasm_generate_liturgy(formatDateForLiturgy(), translation);
			} catch (error) {
				console.log('Failed to initialize WASM module:', error);
			}
		}
	});

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

	let firstReading = $derived.by(() => {
		if (liturgy) {
			return parsedLiturgy[readingIndex].first;
		} else {
			return null;
		}
	});

	let secondReading = $derived.by(() => {
		if (liturgy) {
			return parsedLiturgy[readingIndex].second;
		} else {
			return null;
		}
	});

	let gospel = $derived.by(() => {
		if (liturgy) {
			return parsedLiturgy[readingIndex].gospel;
		} else {
			return null;
		}
	});
</script>

{#if !loaded}
	<div out:fly={{ duration: 200 }} class="absolute text-xl">
		<SvgSpinners270RingWithBg class="my-10 size-10 text-amber-300" />
	</div>
{:else}
	<div in:fly={{ delay: 200 }} class="flex w-full flex-col items-center justify-center">
		<!-- Reading Heading -->
		<DatePicker bind:date {parsedLiturgy} {readingIndex} {multipleReadings} />

		<!-- Readings -->
		<div class="w-full md:w-2/3">
			{#if firstReading}
				<ReadingDisplay title="First Reading" reading={firstReading} />
			{/if}

			{#if secondReading}
				<ReadingDisplay title="Second Reading" reading={secondReading} />
			{/if}

			{#if gospel}
				<ReadingDisplay title="Gospel" reading={gospel} />
			{/if}
		</div>
	</div>
{/if}
