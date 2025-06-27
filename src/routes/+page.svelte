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
				await init({
					module_or_path: '/lectio_wasm_bg.wasm'
				});
				liturgy = wasm_generate_liturgy(formatDateForLiturgy(), translation);
			} catch (error) {
				console.log('Failed to initialize WASM module:', error);
			}
		}
	});

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
