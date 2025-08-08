<script>
	let { data } = $props();
	let { articleJSON } = $derived(data);

	const sections = [
		{ short: 'OB1', long: 'Objection 1' },
		{ short: 'OB2', long: 'Objection 2' },
		{ short: 'OB3', long: 'Objection 3' },
		{ short: 'OB4', long: 'Objection 4' },
		{ short: 'OB5', long: 'Objection 5' },
		{ short: 'CON', long: 'Contrary' },
		{ short: 'ANS', long: 'Answer' },
		{ short: 'RP1', long: 'Reply to Objection 1' },
		{ short: 'RP2', long: 'Reply to Objection 2' },
		{ short: 'RP3', long: 'Reply to Objection 3' },
		{ short: 'RP4', long: 'Reply to Objection 4' },
		{ short: 'RP5', long: 'Reply to Objection 5' }
	];
	// const sections = [{ short: 'OB', long: 'Objections' }];

	// console.log('ArticleJSON:', articleJSON);
</script>

<div class="mb-10 flex flex-col gap-1 text-left">
	{#each sections as section (section.short)}
		{#if articleJSON[section.short]}
			<h3 class="text-xl font-bold">{section.long}</h3>
			<p>{articleJSON[section.short]}</p>
		{/if}
	{/each}
</div>
