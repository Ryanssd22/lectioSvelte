<script>
    import { themes, currentTheme } from '$lib/stores/themeStore.svelte.js'
    import { onMount } from 'svelte'

    console.log("themes object: ", themes);

    function changeTheme(newTheme) {
	currentTheme.theme = newTheme;
	localStorage.setItem("currentTheme",JSON.stringify(newTheme))
    }

    function loadTheme() {
	currentTheme.theme = JSON.parse(localStorage.getItem("currentTheme"))
    }

    onMount( () => {
	loadTheme()
    })
</script>

<h1> {JSON.stringify(currentTheme.theme)}</h1>

{#each themes as theme }
<button onclick = { changeTheme(theme) }
	class=""
	style="background-color: {theme.primary}">
    { theme.title }
</button>
{/each}
<div data-theme="igor">
<p class="bg-test"> CLASS TEST </p>
</div>
