<script>
	import MaterialSymbolsBookRibbonOutlineRounded from '~icons/material-symbols/book-ribbon-outline-rounded';
	import MaterialSymbolsFormatLineSpacingRounded from '~icons/material-symbols/format-line-spacing-rounded';
	import MaterialSymbolsArticleOutlineRounded from '~icons/material-symbols/article-outline-rounded';

	import { Select } from 'bits-ui';

	const translations = ['NABRE', 'DRA', 'RSVCE', 'HWP'];

	let { comfortSpacing = $bindable(), translation = $bindable(), currentSeason } = $props();
</script>

<!-- Reading Bar -->
<div class="my-2 flex w-5/6 items-center justify-start gap-10 rounded-b-lg bg-amber-100 px-3 py-1">
	<!-- Season Display -->
	<div class="flex items-center">
		<MaterialSymbolsBookRibbonOutlineRounded class="relative mr-1 size-5" />
		<p class="text-md font-medium">{currentSeason}</p>
	</div>

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

	<!-- Translation Dropdown -->
	<Select.Root type="single" onValueChange={(t) => (translation = t)} items={translations}>
		<Select.Trigger>
			<div class="flex items-center gap-1">
				<MaterialSymbolsArticleOutlineRounded class="size-5" />
				<p class="font-medium">Translation</p>
			</div>
		</Select.Trigger>

		<Select.Portal>
			<Select.Content>
				<Select.Viewport class="p-1">
					{#each translations as translation, i (i)}
						<Select.Item value={translation}>
							{#snippet children({ selected })}
								{translation}
								{#if selected}
									<div class="ml-auto">
										<p>TEST</p>
									</div>
								{/if}
							{/snippet}
						</Select.Item>
					{/each}
				</Select.Viewport>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
</div>
