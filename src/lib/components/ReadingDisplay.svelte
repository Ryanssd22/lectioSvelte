<script>
	import { fly } from 'svelte/transition';

	let { title, reading } = $props();

	function formatText(str) {
		return str?.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
	}
</script>

<div class="flex w-full items-end justify-between border-b-2 border-amber-100">
	<h2 class="text-3xl font-semibold">{title}</h2>
	<p>{reading.rawReading}</p>
</div>
<div class="mx-10 my-2 flex items-start text-start font-[Lexend]">
	{#if reading.reading.length != 0}
		<p class="indent-8 text-lg font-light">
			{#each reading.reading[0].verses as verse (verse)}
				<span class="relative -ml-1 text-sm opacity-50"><sup>{verse.verse}</sup></span>
				<span class="-ml-1">{@html formatText(verse.translation)}&nbsp;</span>
			{/each}
		</p>
	{:else}
		<p class="indent-8 text-lg opacity-50">Reading not found</p>
	{/if}
</div>
