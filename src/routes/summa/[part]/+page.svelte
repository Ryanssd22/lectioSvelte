<!-- Summa part page -->
<script>
	import MaterialSymbolsArrowRightAltRounded from '~icons/material-symbols/arrow-right-alt-rounded';
	import { page } from '$app/state';
	let { data } = $props();
	let { part, partTitle, summa } = $derived(data);

	console.log(page.url.pathname);
</script>

<!-- <h2>{partTitle}</h2> -->
<div class="my-2 flex w-125 flex-col gap-2 text-left">
	{#each summa[part] as treatise, i (i)}
		<a href="{page.url.pathname}/{i + 1}" class="gap-2 flex items-center justify-between px-2 py-1 rounded-md border-2 border-background-variant hover:scale-105 transition-all">
      <p>{treatise.treatise}</p>
      <MaterialSymbolsArrowRightAltRounded class="size-6"/>
    </a>
    <!-- test {i} -->
	{/each}
</div>
