<script>
	import MaterialSymbolsBookRibbonOutlineRounded from '~icons/material-symbols/book-ribbon-outline-rounded';
	import MaterialSymbolsFormatLineSpacingRounded from '~icons/material-symbols/format-line-spacing-rounded';
	import MaterialSymbolsArticleOutlineRounded from '~icons/material-symbols/article-outline-rounded';
	import IcBaselineKeyboardArrowDown from '~icons/ic/baseline-keyboard-arrow-down';

	import { Select } from 'bits-ui';
	import { crossfade, fly, fade } from 'svelte/transition';
	const [send, receive] = crossfade({ duration: 200 });

	// const translations = ['NABRE', 'DRA', 'RSVCE', 'HWP'];


	let { comfortSpacing = $bindable(), translationIndex = $bindable(), currentSeason, translations } = $props();

	/* TRANSLATION VARIABLES */
	let translationHovered = $state(false);
	let translationOpened = $state(false);
	let translationShowArrow = $derived(translationHovered || translationOpened);
</script>

<!-- Reading Bar -->
<div class="my-2 flex w-5/6 items-center justify-start gap-10 rounded-b-lg bg-amber-100 px-3 py-1">
	<!-- Season Display -->
	<div class="flex items-center">
		<MaterialSymbolsBookRibbonOutlineRounded class="relative mr-1 size-5" />
		<p class="text-md font-medium">{currentSeason}</p>
	</div>

	<!-- Translation Dropdown -->
	<Select.Root
		bind:open={translationOpened}
    bind:value={translationIndex}
		type="single"
		onValueChange={(t) => (translationIndex = t)}
		items={translations}
	>
		<Select.Trigger>
			<button
				class="group flex cursor-pointer items-center active:scale-95 transition-all"
        class:text-amber-700={translationShowArrow}
				onmouseenter={() => (translationHovered = true)}
				onmouseleave={() => (translationHovered = false)}
			>
				<div
					class="relative h-5 w-5 transition-all"
					class:translate-x-[3px]={translationShowArrow}
					class:rotate-90={translationOpened}
				>
					{#if translationShowArrow}
						<div transition:fade={{ duration: 100 }}> 
							<IcBaselineKeyboardArrowDown class="absolute size-5 -rotate-90" />
						</div>
					{:else}
						<div transition:fade={{ duration: 100 }}> 
							<MaterialSymbolsArticleOutlineRounded class="absolute size-5" />
						</div>
					{/if}
				</div>
				<p class="ml-1 font-medium text-inherit">{translations[translationIndex].short}</p>
			</button>
		</Select.Trigger>

		<Select.Portal>
			<Select.Content forceMount>
				{#snippet child({ props, wrapperProps, open })}
					{#if open}
						<div {...wrapperProps}>
							<div {...props} transition:fly={{ y: -5, duration: 100 }}>
								<Select.Viewport class="bg-amber-200 shadow-xl rounded-lg">
									{#each translations as translation, i (i)}
										<Select.Item value={i} class="">
											{#snippet children({ selected })}
                        <p class="font-medium text-center cursor-pointer px-3 hover:bg-amber-300 transition-all py-[4px]" class:bg-amber-400={selected}>
                          {translations[i].long}
                        </p>
											{/snippet}
										</Select.Item>
									{/each}
								</Select.Viewport>
							</div>
						</div>
					{/if}
				{/snippet}
			</Select.Content>
		</Select.Portal>
	</Select.Root>

	<!-- Comfort Spacing -->
	<button
		class:opacity-40={!comfortSpacing}
		class:text-black={!comfortSpacing}
		class="flex cursor-pointer items-center gap-1 rounded-sm p-[2px] text-amber-600 transition-all hover:text-amber-500 hover:opacity-100 active:scale-95"
		onclick={() => {
			comfortSpacing = !comfortSpacing;
		}}
	>
		<MaterialSymbolsFormatLineSpacingRounded class="size-5" />
		<p class="font-medium">
			{#if comfortSpacing}
				Spacious
			{:else}
				Compact
			{/if}
		</p>
	</button>

</div>
