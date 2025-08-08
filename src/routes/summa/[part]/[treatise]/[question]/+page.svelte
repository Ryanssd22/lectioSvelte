<script>
	import MaterialSymbolsArrowRightAltRounded from '~icons/material-symbols/arrow-right-alt-rounded';
	let { data } = $props();
	let { questionJSON, question } = data;

	const sections = [
		{ short: 'OB1', long: 'Objection 1' },
		{ short: 'OB2', long: 'Objection 2' },
		{ short: 'OB3', long: 'Objection 3' },
		{ short: 'OB4', long: 'Objection 4' },
		{ short: 'OB5', long: 'Objection 5' },
		{ short: 'CON', long: 'Contrary' },
		{ short: 'ANS', long: 'Answer' }
	];
</script>

<!-- <h2>{question.question}</h2> -->

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
