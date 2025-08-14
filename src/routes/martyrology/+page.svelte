<!-- Martyrology Page -->
<script>
	import DatePicker from '$lib/components/DatePicker.svelte';
	import { SvelteDate } from 'svelte/reactivity';
	import { fly } from 'svelte/transition';

	let { data } = $props();
	let { martyrology } = data;
	let date = $state(new SvelteDate(Date.now()));

	let formattedDate = $derived.by(() => {
		return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
	});
	let currentMartyrology = $derived.by(() => {
		return updateMartyrology();
	});

	function updateMartyrology() {
		if (!(formattedDate in martyrology)) {
			fetchMartyrology(formattedDate);
			return null;
		}
		return martyrology[formattedDate];
	}

	async function fetchMartyrology(date) {
		const res = await fetch(`/api/martyrology?date=${date}`);
		const day = await res.json();

		console.log(day);
		martyrology[date] = day;
		currentMartyrology = day;
	}
</script>

<div
	class="flex w-full flex-col items-center md:w-5/6"
	in:fly={{ duration: 100, delay: 100 }}
	out:fly={{ duration: 100 }}
>
	<DatePicker {date} title="Martyrology" />
	{#key currentMartyrology}
		<ul
			class="md:w-4/5"
			in:fly={{ duration: 100, y: -10, delay: 100 }}
			out:fly={{ duration: 100, y: 10 }}
		>
			{#each currentMartyrology as item (item)}
				<li class="my-4 border-b-amber-100 text-left font-[Lexend] text-lg font-light">
					&#10013; {item}
				</li>
			{/each}
		</ul>
	{/key}
</div>
