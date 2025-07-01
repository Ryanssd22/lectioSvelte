<script>
  let { title, reading } = $props();

  function formatText(str) {
    return str.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
  }
</script>

<div class="w-full flex justify-between items-end border-b-2 border-amber-100">
  <h2 class="text-3xl font-semibold">{title}</h2>
  <p>{reading.rawReading}</p>
</div>
<div class="mx-10 flex my-2 items-start text-start">
  <p class="text-lg font-[Lexend] font-light indent-8">
  {#each reading.reading[0].verses as verse}
    {@html formatText(verse.translation)}&nbsp;
  {/each}
  </p>
</div>
