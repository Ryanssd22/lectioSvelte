<!-- Summa, treatise page -->
<script>
	import MaterialSymbolsArrowRightAltRounded from '~icons/material-symbols/arrow-right-alt-rounded';

	let { data } = $props();
	let { treatiseJSON, treatiseIndex } = data;
	console.log('TreatiseJSON', treatiseJSON);
</script>

<div class="my-2 flex w-125 flex-col gap-2 text-left">
	{#each treatiseJSON.questions as question, i (i)}
		<a
			href="{treatiseIndex}/{(i + 1).toString()}"
			class="border-background-variant flex items-center justify-between gap-2 rounded-md border-2 px-2 py-1 transition-all hover:scale-105"
		>
			<p>{i + 1}: {question}</p>
			<MaterialSymbolsArrowRightAltRounded class="size-6" />
		</a>
	{/each}
</div>
