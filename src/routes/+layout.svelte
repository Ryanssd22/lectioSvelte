<script lang="ts">
	import '../app.css';
	import Logo from '$lib/images/Logo.svelte';
	import MaterialSymbolsBrushSharp from '~icons/material-symbols/brush-sharp';
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';

	let { children } = $props();
	let pageName = $derived(page.route.id);
	$inspect('page name:', pageName);

	let menuItems = [
		{ title: 'Martyrology', route: '/martyrology' },
		{
			title: 'Themes',
			route: '/themes',
			icon: 'material-symbols:brush-sharp'
		}
	];
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

<div class="mx-2 flex flex-col sm:mx-10">
	<div
		class="m-4 flex h-16 items-center gap-5 border-b-2 border-amber-100 p-5 font-[Lexend] font-light"
	>
		<a href="/">
			<Logo svgClass="w-32" baseColor="amber-500" hoverColor="amber-400" />
		</a>
		{#each menuItems as menuItem (menuItem.title)}
			<a
				href={menuItem.route}
				class="flex items-center transition-all hover:text-amber-300"
				class:text-amber-500={pageName == menuItem.route}
				class:text-black={pageName != menuItem.route}
			>
				{#if menuItem.icon}
					<Icon icon={menuItem.icon} class="mr-[2px] size-[15px]" />
				{/if}
				{menuItem.title}
			</a>
		{/each}
		<!-- <a href="/" class="transition-all hover:text-amber-300"> Martyrology </a> -->
		<!-- <a href="/" class="transition-all hover:text-amber-300"> More Links </a> -->
		<!-- <a -->
		<!-- 	href="/themes" -->
		<!-- 	class:text-amber-500={pageName == '/themes'} -->
		<!-- 	class:text-black={pageName != '/themes'} -->
		<!-- 	class="flex items-center transition-all hover:text-amber-300" -->
		<!-- > -->
		<!-- 	<MaterialSymbolsBrushSharp class="mr-[2px] size-[15px]" /> -->
		<!-- 	<p>Themes</p> -->
		<!-- </a> -->
	</div>

	<div class="flex flex-col items-center text-center">
		{@render children()}
	</div>
</div>
