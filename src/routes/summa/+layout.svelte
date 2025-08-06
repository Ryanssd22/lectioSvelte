<!-- Summa layout, featuring the header -->
<script>
	import MaterialSymbolsArrowLeftAltRounded from '~icons/material-symbols/arrow-left-alt-rounded';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let { data, children } = $props();
	const { summaParts, part, treatise, summa } = $derived(data);
	const { partTitle, partTitleLatin, treatiseTitle } = $derived(page.data);
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
	let navWidth = $state('width: 0px');
	let linkDiv = $state(null);
	let partDiv = $state(null);
	let navReady = $state(false);
	$effect(() => {
		handleNav();
	});

	function handleNav() {
		console.log(linkDiv, partDiv);
		if (treatise && partDiv) {
			console.log('HANDLING PART DIV', partDiv.offsetWidth, linkDiv.offsetWidth);
			navWidth = `width: ${partDiv.offsetWidth}px; height: 75px;`;
		} else if (!treatise && linkDiv) {
			navWidth = `width: ${linkDiv.offsetWidth}px; height: 50px`;
		}
	}
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
		<h1 class="text-3xl font-bold">Summa Theologica</h1>
		<h3>Written by St. Thomas Aquinas</h3>
		<h3>Translated by</h3>
	</div>
	<div class="w-1/5"></div>
</div>
<hr class="bg-background-variant my-2 h-[2px] w-5/6 border-0" />

<!-- Part Navigation -->
<div class="flex w-screen items-center justify-center">
	<div
		class="bg-background-variant border-background-variant relative flex items-center overflow-hidden rounded-xl border-1 transition-all duration-500 ease-in-out hover:shadow-sm"
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
		<div class="absolute flex h-full justify-center" bind:this={linkDiv}>
			{#each summaParts as partObj (partObj.title)}
				<a
					href="/summa/{partObj.link}"
					class="active:bg-background relative z-10 h-full items-center overflow-hidden rounded-lg transition-all"
					class:opacity-0={treatise}
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
			<div class="flex flex-col justify-center px-5" bind:this={partDiv}>
				<a class="text-lg font-medium text-nowrap">{partTitleLatin}</a>
				<h3 class="text-nowrap">{treatiseTitle}</h3>
			</div>
		</div>
	</div>
</div>

{@render children()}

<style>
	:global(.summaLink:hover) {
		color: var(--text-variant-color);
	}
</style>
