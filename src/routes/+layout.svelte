<script lang="ts">
	import '../app.css';
	import Logo from '$lib/images/Logo.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="mx-2 flex flex-col sm:mx-10">
	<div class="m-4 flex h-16 items-center gap-5 border-b-2 border-amber-100 p-5">
		<a href="/">
			<Logo svgClass="w-32" baseColor="amber-500" hoverColor="amber-400" />
		</a>
		<a href="/" class="hover:text-amber-300"> Links </a>
		<a href="/" class="hover:text-amber-300"> More Links </a>
		<a href="/themes" class="hover:text-amber-300"> Themes </a>
	</div>

	<div class="flex flex-col items-center text-center">
		{@render children()}
	</div>
</div>
