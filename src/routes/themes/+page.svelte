<!-- <div class="themes">
    <div class="theme1"> </div>
    <div class="theme2"> </div>
    <div class="theme3 w-24 h-24 bg-red-500"> word </div>
</div> -->

<!-- make it so that the user can either input in a raw hex code, rgb, or the name of a color even to seed the scheme generator-->

<script>

import { onMount } from "svelte";


onMount( async () => {
    fetch("https://www.thecolorapi.com/scheme?")
  .then(response => response.json())
  .then(data => {
		console.log(data);
    apiData.set(data);
  }).catch(error => {
    console.log(error);
    return [];
  });
});


let themes = [];
let crimsonTheme = {
    primary: "#660000",
    secondary: "#990033",
    tertiary: "#4C3B4D",
    title: "crimson",
}
let blueTheme = {
    primary: "#3E78B2",
    secondary: "#F8FFF4",
    tertiary: "#011627",
    title: "blue",
}
themes.push(crimsonTheme);
themes.push(blueTheme);

function chooseTheme(theme) {
    console.log("Selected theme: ", theme);
}

</script>

<style>
    .grid {
	display: grid;
	grid-template-columns: repeat(5, 100px);
	gap: 34px;
    }

    .themeButton {
	background-color: red;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border-radius: 5px;
    }

</style>

<div class="grid">
    {#each themes as theme, i}
	<div class="themeButton hover:scale-105 active:scale-100 transition-all" 
	    onclick = {() => {chooseTheme(theme)}} 
	    style="background-color: {theme.primary}; 
	    color: white" 
	>
	    {theme.title}
	</div>
    {/each}
</div>
