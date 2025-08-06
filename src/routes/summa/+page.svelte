<script>
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';
	let { data } = $props();
	let { summaParts } = data;
	console.log(page);
</script>

<div
	class="flex flex-col items-start"
	in:fade={{ duration: 100, delay: 100 }}
	out:fade={{ duration: 100 }}
>
	{#each summaParts as part (part.title)}
		<p class="my-2 text-xl font-medium">{part.title}</p>
		{#each part.part as treatise, i (i)}
			<a href="summa/{part.link}/{i + 1}" class="summaLink">{treatise.treatise}</a>
		{/each}
	{/each}
</div>
