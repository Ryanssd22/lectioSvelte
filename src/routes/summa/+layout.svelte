<!-- Summa layout, featuring the header -->
<script>
	import MaterialSymbolsArrowLeftAltRounded from '~icons/material-symbols/arrow-left-alt-rounded';
	import MaterialSymbolsArrowBackIosNewRounded from '~icons/material-symbols/arrow-back-ios-new-rounded';
	import MaterialSymbolsArrowForwardIosRounded from '~icons/material-symbols/arrow-forward-ios-rounded';
	import { fade } from 'svelte/transition';
	import { onMount, tick } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let { data, children } = $props();
	const { summaParts, part, treatise, question, article } = $derived(data);
	const { treatiseTitle, questionJSON, articleJSON, treatises, treatiseJSON } = $derived(page.data);
	// let { showBackButton } = data;

	function goBack() {
		goto('./');
	}

	let activeLink = $state(null);
	let activeWid = $state(null);
	let activePos = $state(null);
	onMount(() => {
		handleClick(part);
	});

	let hoveredBoxPos = $state('opacity: 0;');
	let hoveredBoxWid = $state('');
	function handleMouseOver(event) {
		const { offsetWidth, offsetLeft } = event.currentTarget;
		hoveredBoxPos = `transform: translateX(${offsetLeft}px);`;
		hoveredBoxWid = `width: ${offsetWidth}px;`;
	}

	function handleMouseLeave() {
		hoveredBoxPos = `transform: translateX(${activePos}px);`;
		hoveredBoxWid = `width: ${activeWid}px;`;
	}

	function handleClick(part) {
		activeLink = document.querySelector(`#${part}`);
		activePos = activeLink?.offsetLeft;
		activeWid = activeLink?.offsetWidth;

		handleMouseLeave();
	}

	// Handles navigation width when treatise is chosen
	let navWidth = $state('width: 500px');
	let linkDiv = $state(null);
	let partDiv = $state(null);
	let navReady = $state(false);
	$effect(() => {
		handleNav();
	});

	function handleNav() {
		// console.log(linkDiv, partDiv);
		navWidth = 'width: auto; height: auto;';
		if (article && partDiv) {
			navWidth = `width: ${partDiv.offsetWidth}px; height: ${partDiv.offsetHeight}px;`;
		}
		if (question && partDiv) {
			navWidth = `width: ${partDiv.offsetWidth}px; height: ${partDiv.offsetHeight}px;`;
		} else if (treatise && partDiv) {
			navWidth = `width: ${partDiv.offsetWidth}px; height: ${partDiv.offsetHeight}px;`;
		} else if (!treatise && linkDiv) {
			navWidth = `width: ${linkDiv.offsetWidth}px;`;
		}
	}

	const aquinasQuotes = [
		'To one who has faith, no explanation is necessary. To one without faith, no explanation is possible',
		'Beware the man of a single book',
		'The things that we love tell us what we are',
		'There is nothing on this earth more to be prized than true friendship',
		'Wonder is the desire of knowledge.',
		'Adorote devote latens deitas',
		'Altiora te ne quaesieris',
		'Ex nihilo nihil fit',
		'Lex mala, lex nulla'
	];
	const aquinasQuote = aquinasQuotes[Math.floor(Math.random() * aquinasQuotes.length)];
</script>

<div class="flex-between flex w-full">
	<!-- Back Button -->
	<div class="flex w-1/5 items-center">
		{#if page.params.treatise}
			<button
				onclick={goBack}
				class="bg-background-variant flex h-14 w-14 cursor-pointer items-center justify-center rounded-full"
				transition:fade={{ duration: 100 }}
			>
				<MaterialSymbolsArrowLeftAltRounded class="size-10" />
			</button>
		{/if}
	</div>

	<!-- Header -->
	<div class="flex w-3/5 flex-col">
		<h2 class="text-xl font-bold">St. Thomas Aquinas</h2>
		<h1 class="text-3xl font-bold">Summa Theologica</h1>
		<p class="mt-1 text-sm leading-tight">
			"{aquinasQuote}"
		</p>
	</div>
	<div class="w-1/5"></div>
</div>
<hr class="bg-background-variant my-2 h-[2px] w-5/6 border-0" />

<!-- Part Navigation -->
<div class="flex w-full items-center justify-center">
	<div
		class="bg-background-variant border-background-variant relative flex h-50 items-center overflow-hidden rounded-xl border-1 transition-all duration-500 ease-in-out hover:shadow-sm sm:h-[50px]"
		style={navWidth}
	>
		{#if !treatise}
			<!-- Moving Div -->
			<div
				class="absolute inset-0 z-0 opacity-50 transition-all duration-300 ease-in-out"
				style={hoveredBoxPos}
			>
				<!-- Width-changing Div -->
				<div
					class="bg-background h-full w-15 rounded-lg transition-all duration-300 active:bg-blue-500"
					style={hoveredBoxWid}
				></div>
			</div>
		{/if}

		<!-- Links -->
		<div class="absolute flex h-full flex-col justify-center sm:flex-row" bind:this={linkDiv}>
			{#each Object.values(summaParts) as partObj (partObj.title)}
				<a
					href="/summa/{partObj.link}"
					class="active:bg-background relative z-10 h-full items-center overflow-hidden rounded-lg transition-all"
					class:opacity-0={treatise}
					class:pointer-events-none={treatise}
					class:bg-background={partObj.link == part}
					onmouseover={handleMouseOver}
					onfocus={handleMouseOver}
					onmouseleave={handleMouseLeave}
					onclick={() => {
						handleClick(partObj.link);
					}}
					id={partObj.link}
				>
					<div class="relative flex h-full w-full flex-col justify-center p-2 text-nowrap">
						{partObj.latin}
					</div>
				</a>
			{/each}
		</div>

		<!-- Part Div -->
		<div
			class="absolute flex h-full w-full items-center justify-center opacity-0"
			class:opacity-100={treatise}
		>
			<!-- Part -->
			<div class="flex flex-col justify-center gap-1 px-5 py-3" bind:this={partDiv}>
				<div class="flex items-center justify-center gap-2 rounded-lg p-1">
					<!-- <MaterialSymbolsArrowBackIosNewRounded class="size-6" /> -->
					<div class="flex flex-col">
						<h3 class="text-sm leading-tight">PART</h3>
						<h3 class="mx-2 text-lg leading-tight font-medium text-nowrap">
							{summaParts[part].latin}
						</h3>
					</div>
					<!-- <MaterialSymbolsArrowForwardIosRounded class="size-6" /> -->
				</div>

				<hr class="opacity-50" />

				<!-- Treatise -->
				<div class="flex items-center justify-between rounded-lg p-1">
					<a
						href={`/summa/${part}/${Number(treatise) - 1}`}
						class:pointer-events-none={Number(treatise) - 1 <= 0}
						class:opacity-50={Number(treatise) - 1 <= 0}
					>
						<MaterialSymbolsArrowBackIosNewRounded class="size-6" />
					</a>
					<div class="flex flex-col">
						<h3 class="text-sm leading-tight">TREATISE</h3>
						<h3 class="text-md leading-tight font-medium">
							{treatise}: {treatiseTitle}
						</h3>
					</div>
					<a
						href={`/summa/${part}/${Number(treatise) + 1}`}
						class:pointer-events-none={Number(treatise) + 1 > treatises.treatises.length}
						class:opacity-50={Number(treatise) + 1 > treatises.treatises.length}
					>
						<MaterialSymbolsArrowForwardIosRounded class="size-6" />
					</a>
				</div>

				<!-- Question -->
				{#if question}
					<hr class="opacity-50" />
					<div class="flex items-center justify-between rounded-lg p-1">
						<a
							href={`/summa/${part}/${treatise}/${Number(question) - 1}`}
							class:pointer-events-none={Number(question) - 1 <= 0}
							class:opacity-50={Number(question) - 1 <= 0}
						>
							<MaterialSymbolsArrowBackIosNewRounded class="size-6" />
						</a>
						<div class="flex flex-col">
							<h3 class="text-sm leading-tight">QUESTION</h3>
							<h3 class="text-md leading-tight font-medium">
								{question}: {questionJSON.question}
							</h3>
						</div>
						<a
							href={`/summa/${part}/${treatise}/${Number(question) + 1}`}
							class:pointer-events-none={Number(question) + 1 > treatiseJSON.questions.length}
							class:opacity-50={Number(question) + 1 > treatiseJSON.questions.length}
						>
							<MaterialSymbolsArrowForwardIosRounded class="size-6" />
						</a>
					</div>
				{/if}

				<!-- Article -->
				{#if article}
					<hr class="opacity-50" />
					<div class="flex items-center justify-between rounded-lg p-1">
						<a
							href={`/summa/${part}/${treatise}/${question}/${Number(article) - 1}`}
							class:pointer-events-none={Number(article) - 1 <= 0}
							class:opacity-50={Number(article) - 1 <= 0}
						>
							<MaterialSymbolsArrowBackIosNewRounded class="size-6" />
						</a>
						<div class="flex flex-col">
							<h3 class="text-sm leading-tight">ARTICLE</h3>
							<h3 class="text-md leading-tight font-medium">
								{article}: {articleJSON.article}
							</h3>
						</div>
						<a
							href={`/summa/${part}/${treatise}/${question}/${Number(article) + 1}`}
							class:pointer-events-none={Number(question) + 1 > questionJSON.articles.length}
							class:opacity-50={Number(question) + 1 > questionJSON.articles.length}
						>
							<MaterialSymbolsArrowForwardIosRounded class="size-6" />
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

{@render children()}

<hr class="text-background-variant h-2 w-full opacity-50" />
<footer>
	<p class="text-sm">(Benziger Bros. edition, 1947)</p>
	<p class="text-sm">Translated by Fathers of the English Dominican Province</p>
	<p class="text-[10px] opacity-75">
		The original digital file was produced through the kindness of Sandra K. Perry,<br />
		Perrysburg, Ohio.
	</p>
</footer>

<style>
	:global(.summaLink:hover) {
		color: var(--text-variant-color);
	}
</style>
