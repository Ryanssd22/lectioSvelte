<script>
	import MaterialSymbolsArrowLeftAltRounded from '~icons/material-symbols/arrow-left-alt-rounded';
	import MaterialSymbolsArrowRightAltRounded from '~icons/material-symbols/arrow-right-alt-rounded';
	import MaterialSymbolsInfoOutlineRounded from '~icons/material-symbols/info-outline-rounded';
	import MaterialSymbolsRefreshRounded from '~icons/material-symbols/refresh-rounded';
	import MaterialSymbolsCalendarMonthOutlineRounded from '~icons/material-symbols/calendar-month-outline-rounded';

	import { DropdownMenu, DatePicker } from 'bits-ui';

	import { fly } from 'svelte/transition';
	import { SvelteDate } from 'svelte/reactivity';
	import { CalendarDate } from '@internationalized/date';

	let {
		date = $bindable(),
		liturgy = $bindable(),
		readingIndex = $bindable(),
		multipleReadings,
		seasons
	} = $props();
	let formattedDate = $state(formatDate());
	let onToday = $state(true);
	function updateOnToday() {
		let today = new SvelteDate(Date.now());
		let dateToSearch = new SvelteDate(date);
		today.setHours(0, 0, 0, 0);
		dateToSearch.setHours(0, 0, 0, 0);
		onToday = today.getTime() == dateToSearch.getTime();
	}
	let calendarDate = $state(
		new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
	);
	let calendarOpen = $state(false);

	console.log(seasons);

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
	function setDateToday() {
		let today = new Date(Date.now());
		setNewDate(today);
	}
	function updateLiturgy() {
		calendarDate = new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
		formattedDate = formatDate();
		readingIndex = 0;
		updateOnToday();
	}

	function selectReading(value) {
		readingIndex = value;
		console.log(value);
	}

	function calendarSelection() {
		if (calendarDate) {
			let formattedDate = new Date(`${calendarDate}T00:00:00`);
			console.log(`Date chosen: ${calendarDate}`);
			console.log(`Formatted Date: ${formattedDate}`);
			setNewDate(formattedDate);
		} else {
			calendarDate = new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
		}
	}
	function setNewDate(formattedDate) {
		date.setFullYear(formattedDate.getFullYear());
		date.setMonth(formattedDate.getMonth());
		date.setDate(formattedDate.getDate());
		updateLiturgy();
	}
</script>

<div class="w-full md:w-5/6">
	<div class="flex w-full flex-row items-center justify-between rounded-lg">
		<button onclick={datePrev} class="arrowButton group">
			<MaterialSymbolsArrowLeftAltRounded class="arrowIcon group-active:scale-90" />
		</button>
		<div class="mx-1 flex w-full flex-col items-center">
			<div class="relative flex min-h-10 w-full items-end justify-end py-1">
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
														transition:fly={{ y: -5, duration: 100 }}
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
			<div class="flex items-center justify-center pb-1">
				<div class="relative">
					{#if !onToday}
						<MaterialSymbolsRefreshRounded
							class="absolute -top-[9px] -left-5 cursor-pointer opacity-30 transition-colors hover:text-amber-600"
							onclick={setDateToday}
						/>
					{/if}
				</div>

				<DatePicker.Root
					weekdayFormat="short"
					bind:value={calendarDate}
					onValueChange={calendarSelection}
				>
					<DatePicker.Input>
						<DatePicker.Trigger>
							<div class="group flex cursor-pointer items-center">
								<p class="mx-1 justify-self-center">{formattedDate}</p>

								<MaterialSymbolsCalendarMonthOutlineRounded
									class="opacity-30 transition group-hover:opacity-100"
								/>
							</div>
						</DatePicker.Trigger>
					</DatePicker.Input>

					<DatePicker.Content forceMount sideOffset={8} class="z-[999]">
						{#snippet child({ wrapperProps, props, open })}
							{#if open}
								<div {...wrapperProps}>
									<div {...props} transition:fly={{ y: -5, duration: 100 }}>
										<DatePicker.Calendar class="rounded-xl bg-amber-100 p-[22px] shadow-xl">
											{#snippet children({ months, weekdays })}
												<DatePicker.Header class="flex items-center justify-between">
													<DatePicker.PrevButton
														class="inline-flex size-10 items-center justify-center rounded-lg transition-all hover:bg-amber-200 active:scale-[0.98]"
													>
														<MaterialSymbolsArrowLeftAltRounded class="size-7" />
													</DatePicker.PrevButton>
													<DatePicker.Heading class="text-lg font-medium" />
													<DatePicker.NextButton
														class="inline-flex size-10 items-center justify-center rounded-lg transition-all hover:bg-amber-200 active:scale-[0.98]"
													>
														<MaterialSymbolsArrowRightAltRounded class="size-7" />
													</DatePicker.NextButton>
												</DatePicker.Header>
												<div
													class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-y-0 sm:space-x-4"
												>
													{#each months as month (month.value)}
														<DatePicker.Grid class="w-full border-collapse space-y-1 select-none">
															<DatePicker.GridHead>
																<DatePicker.GridRow class="mb-1 flex w-full justify-between">
																	{#each weekdays as day, i (i)}
																		<DatePicker.HeadCell
																			class="text-muted-foreground w-10 rounded-md text-xs font-normal!"
																		>
																			<div>{day.slice(0, 2)}</div>
																		</DatePicker.HeadCell>
																	{/each}
																</DatePicker.GridRow>
															</DatePicker.GridHead>
															<DatePicker.GridBody>
																{#each month.weeks as weekDates (weekDates)}
																	<DatePicker.GridRow class="flex w-full">
																		{#each weekDates as date (date)}
																			<DatePicker.Cell
																				{date}
																				month={month.value}
																				class="relative size-13 p-0! text-center"
																			>
																				<DatePicker.Day
																					class="data-selected:text-background group relative inline-flex size-13 cursor-pointer items-center justify-center rounded-lg border border-transparent p-0 text-base font-light font-normal whitespace-nowrap transition-all hover:bg-amber-200 data-disabled:pointer-events-none data-outside-month:pointer-events-none data-outside-month:text-black/40 data-selected:bg-amber-400 data-selected:font-medium data-unavailable:line-through data-unavailable:opacity-50"
																				>
																					{#if seasons[date] == 'Ordinary'}
																						<div class="dateDot bg-green-600"></div>
																					{/if}
																					{#if seasons[date] == 'Advent' || seasons[date] == 'Lent'}
																						<div class="dateDot bg-purple-600"></div>
																					{/if}
																					{#if seasons[date] == 'Christmas' || seasons[date] == 'Easter'}
																						<div class="dateDot bg-yellow-500"></div>
																					{/if}
																					{date.day}
																				</DatePicker.Day>
																			</DatePicker.Cell>
																		{/each}
																	</DatePicker.GridRow>
																{/each}
															</DatePicker.GridBody>
														</DatePicker.Grid>
													{/each}
												</div>
											{/snippet}
										</DatePicker.Calendar>
									</div>
								</div>
							{/if}
						{/snippet}
					</DatePicker.Content>
				</DatePicker.Root>
			</div>
		</div>
		<button onclick={dateNext} class="arrowButton group">
			<MaterialSymbolsArrowRightAltRounded class="arrowIcon group-active:scale-90" />
		</button>
	</div>
</div>
