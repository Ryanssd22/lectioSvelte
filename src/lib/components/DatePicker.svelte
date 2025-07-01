<script>
	import MaterialSymbolsArrowLeftAltRounded from '~icons/material-symbols/arrow-left-alt-rounded';
	import MaterialSymbolsArrowRightAltRounded from '~icons/material-symbols/arrow-right-alt-rounded';
	import MaterialSymbolsInfoOutlineRounded from '~icons/material-symbols/info-outline-rounded';
	import MaterialSymbolsBookRibbonOutlineRounded from '~icons/material-symbols/book-ribbon-outline-rounded';
	import MaterialSymbolsFormatLineSpacingRounded from '~icons/material-symbols/format-line-spacing-rounded';

	import { DropdownMenu } from 'bits-ui';

	import { fly } from 'svelte/transition';

	let selected = $state(0);
	$inspect(selected);
	let {
		date = $bindable(),
		liturgy = $bindable(),
		readingIndex = $bindable(),
		comfortSpacing = $bindable(),
		multipleReadings,
		season
	} = $props();
	let formattedDate = $state(formatDate());

	let title = $derived.by(() => {
		if (liturgy) {
			return liturgy[readingIndex].title;
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
		readingIndex = 0;
	}

	function selectReading(value) {
		readingIndex = value;
		console.log(value);
	}
</script>

<div class="w-full md:w-5/6">
	<div class="flex w-full flex-row items-center justify-between rounded-lg bg-amber-100">
		<button onclick={datePrev} class="arrowButton group">
			<MaterialSymbolsArrowLeftAltRounded class="arrowIcon group-active:scale-90" />
		</button>
		<div class="mx-1 flex w-full flex-col items-center">
			<div class="relative flex min-h-10 w-full items-end justify-end overflow-hidden py-1">
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

				{#key liturgy}
					<div
						in:fly={{ duration: 100, delay: 100, y: titleFly }}
						out:fly={{ duration: 100, y: -titleFly }}
						class="absolute inset-0 flex items-end justify-center px-2 text-center text-3xl leading-tight font-semibold"
					>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger class={multipleReadings ? 'cursor-pointer' : ''}>
								<div class="flex h-full">
									<h1 class="items-end">{title}</h1>
									{#if multipleReadings}
										<div>
											<MaterialSymbolsInfoOutlineRounded class="relative size-4 opacity-60" />
										</div>
									{/if}
								</div>
							</DropdownMenu.Trigger>

							{#if multipleReadings}
								<DropdownMenu.Portal>
									<DropdownMenu.Content
										preventScroll={false}
										side="bottom"
										align="center"
										alignOffset={-8}
										forceMount
									>
										{#snippet child({ wrapperProps, props, open })}
											{#if open}
												<div {...wrapperProps}>
													<div
														{...props}
														class="flex flex-col overflow-hidden rounded-lg bg-amber-200 text-center shadow-xl"
														transition:fly={{ y: -5 }}
													>
														{#each liturgy as reading, i (reading.title)}
															<DropdownMenu.Item
																onclick={() => {
																	selectReading(i);
																}}
																class="cursor-pointer px-4 py-2 font-medium transition-all hover:bg-amber-500 hover:text-white"
															>
																{reading.title}
															</DropdownMenu.Item>
														{/each}
													</div>
												</div>
											{/if}
										{/snippet}
									</DropdownMenu.Content>
								</DropdownMenu.Portal>
							{/if}
						</DropdownMenu.Root>
					</div>
				{/key}
			</div>
			<p class="pb-1">{formattedDate}</p>
		</div>
		<button onclick={dateNext} class="arrowButton group">
			<MaterialSymbolsArrowRightAltRounded class="arrowIcon group-active:scale-90" />
		</button>
	</div>

	<div class="mx-3 my-1 flex w-full items-center justify-start gap-10">
		<div class="flex items-center">
			<MaterialSymbolsBookRibbonOutlineRounded class="relative mr-1 size-5" />
			<p class="text-md font-medium">{season}</p>
		</div>

		<button
			class:bg-amber-200={comfortSpacing}
			class="cursor-pointer rounded-sm p-[2px] transition-all hover:bg-amber-300 active:scale-95"
			onclick={() => {
				comfortSpacing = !comfortSpacing;
			}}
		>
			<MaterialSymbolsFormatLineSpacingRounded class="size-5" />
		</button>
	</div>
</div>
