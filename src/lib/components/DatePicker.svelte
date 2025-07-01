<script>
	import MaterialSymbolsArrowLeftAltRounded from '~icons/material-symbols/arrow-left-alt-rounded';
	import MaterialSymbolsArrowRightAltRounded from '~icons/material-symbols/arrow-right-alt-rounded';
	import MaterialSymbolsInfoOutlineRounded from '~icons/material-symbols/info-outline-rounded';

	import { fly } from 'svelte/transition';

	let {
		date = $bindable(),
		parsedLiturgy = $bindable(),
		readingIndex,
		multipleReadings
	} = $props();
	let formattedDate = $state(formatDate());

	let title = $derived.by(() => {
		if (parsedLiturgy) {
			return parsedLiturgy[readingIndex].title;
		} else {
			return '';
		}
	});

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
	}

	$inspect(parsedLiturgy);
</script>

<div
	class="mb-3 flex w-full flex-row items-center justify-between rounded-lg bg-amber-100 md:w-5/6"
>
	<button onclick={datePrev} class="arrowButton group">
		<MaterialSymbolsArrowLeftAltRounded class="arrowIcon group-active:scale-90" />
	</button>
	<div class="mx-1 flex w-full flex-col items-center">
		<div class="relative flex min-h-10 w-full items-end justify-end overflow-hidden py-1">
			<!-- <h1 -->
			<!-- 	class="pointer-events-none px-2 text-end text-3xl leading-tight font-semibold opacity-0" -->
			<!-- 	aria-hidden="true" -->
			<!-- > -->
			<!-- 	{title} -->
			<!-- </h1> -->
			<div
				in:fly={{ duration: 100, delay: 100, y: titleFly }}
				out:fly={{ duration: 100, y: -titleFly }}
				class="pointer-events-none flex items-end justify-center px-2 text-center text-3xl leading-tight font-semibold opacity-0"
				aria-hidden="true"
			>
				<h1 class="items-end">{title}</h1>
				{#if multipleReadings}
					<div class="flex h-4/5">
						<MaterialSymbolsInfoOutlineRounded class="size-4 items-start opacity-60" />
					</div>
				{/if}
			</div>

			{#key parsedLiturgy}
				<div
					in:fly={{ duration: 100, delay: 100, y: titleFly }}
					out:fly={{ duration: 100, y: -titleFly }}
					class="absolute inset-0 flex items-end justify-center px-2 text-center text-3xl leading-tight font-semibold"
          class:hover:cursor-pointer={multipleReadings}
				>
					<h1 class="items-end">{title}</h1>
					{#if multipleReadings}
						<div class="flex h-4/5">
							<MaterialSymbolsInfoOutlineRounded class="size-4 items-start opacity-60" />
						</div>
					{/if}
				</div>
			{/key}
		</div>
		<p class="pb-1">{formattedDate}</p>
	</div>
	<button onclick={dateNext} class="arrowButton group">
		<MaterialSymbolsArrowRightAltRounded class="arrowIcon group-active:scale-90" />
	</button>
</div>
