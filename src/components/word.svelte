<script lang="ts">
    import Letter from "./letter.svelte";
    export let currentLetters: string[];
</script>

<div class="flex items-center justify-center gap-2">
    {#each currentLetters as _ , rowIndex}
        <Letter bind:value={currentLetters[rowIndex]} />
    {/each}
</div>