import type { Readable } from "svelte/motion";
import { writable, readable } from "svelte/store";

export const currentWord = writable("");
export const alphabet = 'qwertyuiopasdfghjklzxcvbnm';
interface ILetterDict {
    [id: string]: number;
}

export const letterStatus = writable<ILetterDict>({}, (set) => {
    const result: ILetterDict = {};
    [...alphabet].forEach(l => {
        result[l] = 0;
    });
    set(result);
});

// const length = Math.floor(Math.random() * (9 - 4 + 1) + 4);
export const allWords: Readable<string[]> = readable([], (set) => {
    fetch('https://random-word-api.herokuapp.com/all')
        .then(res => res.json())  
        .then(data => set(data));  
})

export async function fetchWord(length: number) {
    let url = `https://random-word-api.herokuapp.com/word?length=${length}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        currentWord.set(data[0].toUpperCase()); 
    } catch (error) {
        console.error('Fetch error: ', error);
        currentWord.set(""); 
    }
}