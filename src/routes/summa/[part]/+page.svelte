<!-- Summa part page -->
<script>
	import { page } from '$app/state';
	let { data } = $props();
	let { part, partTitle, summa } = $derived(data);

	console.log(page.url.pathname);
</script>

<!-- <h2>{partTitle}</h2> -->
{#each summa[part] as treatise, i (i)}
	<a href="{page.url.pathname}/{i + 1}">{treatise.treatise}</a>
{/each}
