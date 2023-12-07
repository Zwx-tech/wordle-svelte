<script lang="ts">
    import { onMount } from "svelte";
    import Word from "../components/word.svelte";
    import { currentWord, fetchWord, allWords } from "../stores/store";
  import Alert from "../components/alert.svelte";

    // setup
    let wordLength = 5;
    let guessesAmount = 6;
    let inputLetters: string[][] = [...Array(guessesAmount)].map(_ => [...Array(wordLength)].map(_ => ''));
    let currentGuess = 0;
    let lastKey = '';
    let alert = {
        isVisible: false,
        message: "fshhfshf",
    }
    allWords.subscribe(value => {
        console.log(value)
    })
    // fetch World from api onMount
    onMount(async () => {
        await fetchWord(wordLength);
        await console.log($currentWord);
    });

    function displayAlert(message: string) {
        alert = {
            isVisible: true,
            message: message,
        }
    }
    // handle keypress 
    function handleKeypress(event?: KeyboardEvent, key='') {
        // prevent from holding one key
        if (lastKey === (event?.key || key)) 
            return;
        lastKey = event?.key || key;
        // sfhshfhsfh
        if(event) key = event.key;
        // handle key press
        if(key == "Enter") {
            // check logic
            let word = inputLetters[currentGuess].join('');
            if(word.length < wordLength) {
                return;
            }
            if (!$allWords) {
                return
            }
            if(word === "chwdp") {
                displayAlert('Zasady trzymamy sie');
                return;
            }
            // if(!$allWords.some(w => w == word ))  {
            //     displayAlert('Invalid word');
            //     return;
            // }  
            checkWord(word);

            console.log(word) 
        }
        // handle deleting last char
        if(key == "Backspace") {
            inputLetters[currentGuess].slice().reverse().some((letter, i) => {
                if(!letter) {
                    return false;
                }
                inputLetters[currentGuess][wordLength - i - 1] = ''
                return true;
            });
        }
        if(key.length > 1 || key === ' ') {
            return;
        }
        inputLetters[currentGuess].some((letter, i) => {
            if(letter) {
                return false;
            }
            inputLetters[currentGuess][i] = key;
            return true;
        });
        // handle key click

    }

    function checkWord(word: string): Boolean {
        const correctLetters = [...$currentWord.toLowerCase()];
        const reuslt = Array.from(word).map((letter, i) => {
            if(correctLetters[i] === letter) {
                correctLetters[i] = '/*/';
                return 2;
            }
            if(correctLetters.some(l => l===letter)){
                correctLetters.some((l, j) => {
                    if(l===letter){
                        correctLetters[j] = '/*/';
                        return true;
                    }
                    return false
                })
                return 1;
            }
            return 0;
        });
        console.log(reuslt)
        return true;
    }

</script>
<svelte:body
 on:keydown={(event) => handleKeypress(event)}
 on:keyup={() => lastKey=''}
/>
<main>
    {#if $currentWord && $allWords.length > 0}
    <h1 class="text-center text-[2.4rem] font-semibold py-2">Wordle game</h1>
    <div class="flex flex-col items-center gap-2 mt-4">
            <Alert isVisible={alert.isVisible} message={alert.message} />
            {#each inputLetters as word}
                <Word currentLetters={word} />
            {/each}
        </div>
    {:else}
        <div class="text-center">
            Loading...
        </div>
    {/if}
</main>
    
