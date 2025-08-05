<script>
	// import { beforeNavigate } from '$app/navigation';

	let { data, children } = $props();
</script>

<div class="flex flex-col">
	<h1 class="text-3xl font-bold">Summa Theologica</h1>
	<h3>Written by St. Thomas Aquinas</h3>
	<h3>Translated by</h3>
	<hr class="bg-background-variant my-2 h-px w-full border-0" />
</div>

{@render children()}
