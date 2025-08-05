<!-- Summa, treatise layout-->
<script>
	let { data, children } = $props();
	let { treatise } = data;
</script>

<h2 class="text-lg font-medium">{treatise.treatise}</h2>
{@render children()}
