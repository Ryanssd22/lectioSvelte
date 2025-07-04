<script>
	import SvgSpinners270RingWithBg from '~icons/svg-spinners/270-ring-with-bg';

	import DatePicker from '$lib/components/DatePicker.svelte';
	import ReadingDisplay from '$lib/components/ReadingDisplay.svelte';
	import { SvelteDate } from 'svelte/reactivity';

	import { fly } from 'svelte/transition';

	import { browser } from '$app/environment';
	import init, { wasm_generate_liturgy } from '$lib/lectio-pkg/lectio_wasm';
	import { onMount, untrack } from 'svelte';

	let date = new SvelteDate(Date.now());
	let translation = $state('NABRE');
	let readingIndex = $state(0);

	let mounted = $state(false);
	let generatedLiturgy = $derived.by(() => {
		date;
		if (mounted) {
			return JSON.parse(wasm_generate_liturgy(formatDateForLiturgy(), translation));
		} else {
			return null;
		}
	});
	let currentSeason = $derived.by(() => {
		if (generatedLiturgy) {
			return generatedLiturgy.season[formatDateForLiturgy()];
		} else {
			return null;
		}
	});

	let liturgy = $derived.by(() => {
		if (mounted) {
			return generatedLiturgy?.liturgy;
		} else {
			return null;
		}
	});

	let multipleReadings = $derived(liturgy?.length > 1 ? true : false);
	let loaded = $derived(mounted && liturgy);
	onMount(async () => {
		if (browser) {
			try {
				init({
					module_or_path: '/lectio_wasm_bg.wasm'
				}).then(() => {
					mounted = true;
					generatedLiturgy = JSON.parse(wasm_generate_liturgy(formatDateForLiturgy(), translation));
				});
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

	let comfortSpacing = $state(false);
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
</script>

{#if !loaded}
	<div out:fly={{ duration: 200 }} class="absolute text-xl">
		<SvgSpinners270RingWithBg class="my-10 size-10 text-amber-300" />
	</div>
{:else}
	<div in:fly={{ delay: 200 }} class="flex w-full flex-col items-center justify-center">
		<!-- Reading Heading -->
		<DatePicker
			bind:date
			bind:comfortSpacing
			seasons={generatedLiturgy.season}
			{currentSeason}
			{liturgy}
			bind:readingIndex
			{multipleReadings}
		/>

		<!-- Readings -->
		{#key liturgy}
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
		{/key}
	</div>
{/if}
