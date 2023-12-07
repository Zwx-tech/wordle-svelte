<script lang="ts">
  import { letterStatus } from "../stores/store";

    export let onKeyPress = (letter: string) => {};
  
    const alphabet = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
  </script>
  
  <div class="flex flex-col justify-center gap-2 mx-auto mt-8">
      {#each alphabet as line }
      <div class="flex justify-center gap-2">
          {#each line as letter (letter)}
           <button 
            class={`w-14 aspect-square border text-center text-2xl rounded-lg bg-gray-100 border-gray-200 border-2 cursor-pointer`} 
            on:click={() => onKeyPress(letter)}
            class:match = {$letterStatus[letter] === 3}
           >
           {letter}
           </button>
          {/each}
      </div>
    {/each}
  </div>
  