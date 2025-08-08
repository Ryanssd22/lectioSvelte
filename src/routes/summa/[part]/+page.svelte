<!-- Summa part page -->
<script>
	import MaterialSymbolsArrowRightAltRounded from '~icons/material-symbols/arrow-right-alt-rounded';
	import { page } from '$app/state';
	let { data } = $props();
	let { part, treatises } = $derived(data);

	$inspect('Treatises:', treatises);
</script>

<!-- <h2>{partTitle}</h2> -->
<div class="my-2 flex w-125 flex-col gap-2 text-left">
	{#each treatises.treatises as treatise, i (i)}
		<a
			href="{page.url.pathname}/{i + 1}"
			class="border-background-variant flex items-center justify-between gap-2 rounded-md border-2 px-2 py-1 transition-all hover:scale-105"
		>
			<p>{i + 1}: {treatise}</p>
			<MaterialSymbolsArrowRightAltRounded class="size-6" />
		</a>
	{/each}
</div>
