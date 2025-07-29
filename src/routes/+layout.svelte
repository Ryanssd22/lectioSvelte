<!--+layout.svelte-->
<script lang="ts">
	import '../app.css';
	import Logo from '$lib/images/Logo.svelte';
	import { currentTheme } from '$lib/stores/themeStore.svelte.js'
	let { children } = $props();

</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<style global>
:global(html),
:global(body) {
    margin: 0;
    padding: 0;
    height: 100%; /* Or min-height: 100vh; */
}

</style>

<div data-theme={currentTheme.theme.title} class="min-h-screen text-text" 
    style="background-color: background-test;"
>
    <div class="background-color: background-test" style="body">
	<div class="mx-2 flex flex-col sm:mx-10">
	    <div class="m-4 flex h-16 items-center gap-5 border-b-2 border-amber-100 p-5">
		<a href="/">
		    <Logo svgClass="w-32" baseColor=bg-amber-300 hoverColor=bg-amber-400 />
		</a>
		<a href="/" class="transition-colors hover:text-accent">Links</a>
		<a href="/" class="transition-colors hover:text-accent">More Links</a>
		<a href="/themes" class="transition-colors hover:text-accent"> Themes </a>
	    </div>

	    <div class="flex flex-col items-center text-center">
		{@render children()}
	    </div>
	</div>
    </div>
</div>
