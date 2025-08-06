<!--+layout.svelte-->
<script lang="ts">
	import '../app.css';
	import Logo from '$lib/images/Logo.svelte';

	import { currentTheme } from '$lib/stores/themeStore.svelte.js';

	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let { children } = $props();
	let pageName = $derived(page.route.id);
	$inspect('page name:', pageName);

	let menuItems = [
		{ title: 'Martyrology', route: '/martyrology' },
		{ title: 'Summa', route: '/summa' },
		{
			title: 'Themes',
			route: '/themes',
			icon: 'material-symbols:brush-sharp'
		}
	];

	let mounted = $state(false);
	onMount(() => {
		mounted = true;
		currentTheme.theme = JSON.parse(localStorage.getItem('currentTheme')).title || {
			title: 'lectio'
		};
	});

	let menuClick = $state(false);
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
	<div class="mt-4 flex h-16 items-center gap-5 p-5 font-[Lexend] font-light">
		<a href="/" class="">
			<Logo svgClass="w-32" baseColor="blue" hoverColor="red" />
		</a>
		{#if mounted}
			<div transition:fade class="flex items-center gap-4">
				{#each menuItems as menuItem (menuItem.title)}
					<a
						href={menuItem.route}
						class="hover:text-primary text-md flex items-center transition-all"
						class:text-primary={pageName.includes(menuItem.route)}
						onclick={() => {
							menuClick = !menuClick;
						}}
					>
						{#if menuItem.icon}
							<Icon icon={menuItem.icon} class="mr-[2px] size-[15px]" />
						{/if}
						{menuItem.title}
					</a>
				{/each}
			</div>
		{/if}
	</div>

	<hr class="bg-background-variant mb-4 h-[2px] border-0" />

	{#key menuClick}
		<div
			class="flex flex-col items-center text-center"
			in:fade={{ duration: 100, delay: 100 }}
			out:fade={{ duration: 100 }}
		>
			{@render children()}
		</div>
	{/key}
</div>

<style global>
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
		height: 100%; /* Or min-height: 100vh; */
	}
</style>
