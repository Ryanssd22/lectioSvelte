<!-- Summa, treatise page -->
<script>
	import MaterialSymbolsArrowRightAltRounded from '~icons/material-symbols/arrow-right-alt-rounded';

	let { data } = $props();
	let { treatiseJSON, treatiseIndex } = $derived(data);

	let subs = $derived(treatiseJSON.subs);
	let subIndex = $derived.by(() => {
		if (subs) {
			let index = {};
			for (const sub of subs) {
				index[sub.start - 1] = sub.sub;
			}
			return index;
		} else {
			return {};
		}
	});
</script>

<div class="my-2 flex w-125 flex-col gap-2 text-left">
	{#each treatiseJSON.questions as question, i (i)}
		{#if subIndex[i]}
			<h3 class="text-xl font-bold">{subIndex[i]}</h3>
		{/if}
		<a
			href="{treatiseIndex}/{(i + 1).toString()}"
			class="border-background-variant flex items-center justify-between gap-2 rounded-md border-2 px-2 py-1 transition-all hover:scale-105"
		>
			<p>{i + 1}: {question}</p>
			<MaterialSymbolsArrowRightAltRounded class="size-6" />
		</a>
	{/each}
</div>
