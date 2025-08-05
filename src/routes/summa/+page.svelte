<script>
	let { data } = $props();
	let { summaParts } = data;
</script>

<div class="flex flex-col items-start" out:fade={{ duration: 100 }}>
	{#each summaParts as part (part.title)}
		<p class="my-2 text-xl font-medium">{part.title}</p>
		{#each part.part as treatise, i (i)}
			<a href="summa/{part.link}/{i + 1}">{treatise.treatise}</a>
		{/each}
	{/each}
</div>
