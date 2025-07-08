<script>
	import SvgSpinners270RingWithBg from '~icons/svg-spinners/270-ring-with-bg';

	import DatePicker from '$lib/components/DatePicker.svelte';
	import ReadingDisplay from '$lib/components/ReadingDisplay.svelte';
	import ReadingBar from '$lib/components/ReadingBar.svelte';
	import { SvelteDate } from 'svelte/reactivity';

	import { fly } from 'svelte/transition';

	import { browser } from '$app/environment';
	import init, { wasm_generate_liturgy } from '$lib/lectio-pkg/lectio_wasm';
	import { onMount } from 'svelte';

	let date = $state(new SvelteDate(Date.now()));
	const translations = [
		{ short: 'NABRE', long: 'New American Bible Revised Edition', raw: '' },
		{ short: 'DRA', long: 'Douay-Rheims Bible', raw: '' },
		{ short: 'RSVCE', long: 'Revised Standard Version Catholic Edition', raw: '' },
		{ short: 'HWP', long: 'Hawai‘i Pidgin', raw: '' }
	];
	let translationIndex = $state(0);

	let readingIndex = $state(0);

	let mounted = $state(false);
	let translationLoaded = $state(false);
	let generatedLiturgy = $derived.by(() => {
		if (mounted && translationLoaded) {
			return JSON.parse(
				wasm_generate_liturgy(formatDateForLiturgy(), translations[translationIndex].raw)
			);
		} else {
			return null;
		}
	});
	let lastLiturgy = null;
	let liturgy = $derived.by(() => {
		if (mounted) {
			if (generatedLiturgy?.liturgy == undefined) {
				return lastLiturgy;
			}
			lastLiturgy = generatedLiturgy.liturgy;
			return generatedLiturgy.liturgy;
		} else {
			return null;
		}
	});
	async function loadTranslation(index) {
		console.log(`Loading ${translations[index].short}`);
		const raw = await fetch(`bibles/${translations[index].short}.txt`);
		const text = await raw.text();
		translations[index].raw = text;
		translationLoaded = true;
	}
	$effect(() => {
		if (mounted) {
			translationLoaded = false;
			if (translations[translationIndex].raw == '') {
				loadTranslation(translationIndex);
			} else {
				translationLoaded = true;
			}
		}
	});

	let lastSeason = null;
	let currentSeason = $derived.by(() => {
		if (generatedLiturgy) {
			lastSeason = generatedLiturgy.season[formatDateForLiturgy()];
			return lastSeason;
		} else {
			if (lastSeason) {
				return lastSeason;
			}
			return null;
		}
	});

	let multipleReadings = $derived(liturgy?.length > 1 ? true : false);
	let loaded = $state(false);
	$effect(() => {
		if (mounted && liturgy) {
			loaded = true;
		}
	});
	onMount(async () => {
		if (browser) {
			// Getting local storage variables
			comfortSpacing = getLocalStorage('comfortSpacing', false);
			translationIndex = getLocalStorage('translationIndex', 0);

			console.log('TranslationIndex:', translationIndex);

			try {
				await init({
					module_or_path: '/lectio_wasm_bg.wasm'
				});
			} catch (error) {
				console.log('Failed to initialize WASM module:', error);
				return;
			}

			mounted = true;
		}
	});

	function getLocalStorage(variable, fallback) {
		const localVar = localStorage.getItem(variable);
		if (localVar) {
			if (localVar == 'true') {
				return true;
			}
			if (localVar == 'false') {
				return false;
			}
			if (localVar == '0') {
				return 0;
			}
			return Number(localVar) ? Number(localVar) : localVar;
		} else {
			return fallback;
		}
	}

	function formatDateForLiturgy() {
		let year = date.getFullYear();
		let day = date.getDate().toString();
		let month = (date.getMonth() + 1).toString();
		return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
	}

	let comfortSpacing = $state(null);
	let firstReading = $derived.by(() => {
		if (liturgy) {
			return liturgy[readingIndex].first;
		} else {
			return null;
		}
	});

	let secondReading = $derived.by(() => {
		if (liturgy) {
			return liturgy[readingIndex].second;
		} else {
			return null;
		}
	});

	let gospel = $derived.by(() => {
		if (liturgy) {
			return liturgy[readingIndex].gospel;
		} else {
			return null;
		}
	});

	// Handling Local Storage
	$effect(() => {
		if (comfortSpacing != null) {
			localStorage.setItem('comfortSpacing', comfortSpacing);
		}
	});
	$effect(() => {
		if (translationIndex != null) {
			localStorage.setItem('translationIndex', translationIndex);
		}
	});

	$inspect(liturgy);
</script>

{#if !loaded}
	<div out:fly={{ duration: 200 }} class="absolute text-xl">
		<SvgSpinners270RingWithBg class="my-10 size-10 text-amber-300" />
	</div>
{:else}
	<div in:fly={{ delay: 200 }} class="flex w-full flex-col items-center justify-center">
		<div class="flex w-full flex-col items-center md:w-5/6">
			<!-- Reading Heading -->
			<DatePicker
				bind:date
				seasons={generatedLiturgy.season}
				{currentSeason}
				{liturgy}
				bind:readingIndex
				{multipleReadings}
				{translationLoaded}
			/>

			<!-- Reading Bar -->
			<ReadingBar bind:comfortSpacing bind:translationIndex {translations} {currentSeason} />
		</div>

		<!-- Readings -->
		{#key liturgy}
			{#if translationLoaded}
				<div
					in:fly={{ duration: 100, delay: 100, y: 10 }}
					out:fly={{ duration: 100, y: -10 }}
					class="w-full md:w-2/3"
				>
					{#if firstReading}
						<ReadingDisplay title="First Reading" reading={firstReading} {comfortSpacing} />
					{/if}

					{#if secondReading}
						<ReadingDisplay title="Second Reading" reading={secondReading} {comfortSpacing} />
					{/if}

					{#if gospel}
						<ReadingDisplay title="Gospel" reading={gospel} {comfortSpacing} />
					{/if}
				</div>
			{:else}
				<p>TEST</p>
			{/if}
		{/key}
	</div>
{/if}
