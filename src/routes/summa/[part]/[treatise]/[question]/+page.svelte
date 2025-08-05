<script>
	let { data } = $props();
	let { question } = data;
	console.log(question);

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

<h2>{question.question}</h2>

{#each sections as section (section.short)}
	{#if question[section.short]}
		<h3 class="font-medium">{section.long}</h3>
		<p>{question[section.short]}</p>
	{/if}
{/each}
