<!-- Summa, treatise page -->
<script>
	let { data } = $props();
	let { treatiseJSON, treatiseIndex } = data;
</script>

{#each treatiseJSON.articles as question, i (question.question)}
	<a href="{treatiseIndex}/{(i + 1).toString()}">{question.question}</a>
{/each}
