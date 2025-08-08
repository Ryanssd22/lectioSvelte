<script>
	import MaterialSymbolsArrowRightAltRounded from '~icons/material-symbols/arrow-right-alt-rounded';
	let { data } = $props();
	let { questionJSON, question } = $derived(data);

	console.log(questionJSON);
</script>

<!-- <h2>{question.question}</h2> -->

<p class="mt-4 mb-2 w-2/3 text-left">{questionJSON.description}</p>
<div class="my-2 flex w-125 flex-col gap-2 text-left">
	{#each questionJSON.articles as article, i (i)}
		<a
			href="{question}/{(i + 1).toString()}"
			class="border-background-variant flex items-center justify-between gap-2 rounded-md border-2 px-2 py-1 transition-all hover:scale-105"
		>
			<p>{i + 1}: {article}</p>
			<MaterialSymbolsArrowRightAltRounded class="size-6" />
		</a>
	{/each}
</div>
