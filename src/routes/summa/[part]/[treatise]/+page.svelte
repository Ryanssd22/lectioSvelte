<!-- Summa, treatise page -->
<script>
	let { data } = $props();
	let { treatise, treatiseIndex } = data;
</script>

{#each treatise.articles as question, i (question.question)}
	<a href="{treatiseIndex}/{(i + 1).toString()}">{question.question}</a>
{/each}
