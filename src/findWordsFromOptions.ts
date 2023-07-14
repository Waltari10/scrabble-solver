/*
Please write a function that accepts a single string as input, and that returns a list of English words that can be created using some combination of the letters in the input string.
 
Example input: "oogd"
Example output: ["good", "god", "dog", "goo", "do", "go"]
 
You can assume you'll be given an array of strings that enumerates all valid English words. To determine whether a word is a valid word, you can simply check for its presence in the array (e.g., `WORDS.includes(word)`)

Please focus on writing readable, production-quality code. And of course, feel free to let me know if you have any questions!
*/

type CharMap = Record<string, number>;

/**
 * Takes in to CharMaps and checks if the first charMap can be used to construct the other
 * For example: Inputs { o: 2, g: 1, d: 1 } and { o: 1, d: 1 } would return true, but
 * { o: 2, g: 1, d: 1 } and { o: 1, d: 2 } would return false
 */
const isCharMapContainedInCharMap = (charMap1: CharMap, charMap2: CharMap): boolean => {
    let charMapIsContainedInCharMap = true;

    for (const char in charMap2) {
        const charMapHasEnoughOfCharacter = charMap1[char] >= charMap2[char];

        if (!charMapHasEnoughOfCharacter) {
            charMapIsContainedInCharMap = false;
        }
    }
    return charMapIsContainedInCharMap;
}


/**
 * Takes in a string and returns an object with the letters and their counts
 * For example: "oogd" would return { o: 2, g: 1, d: 1 }
 * Not sorted.
 */
const stringToCharMap = (string: string, caseSensitive: boolean): CharMap => {
    const charMap: CharMap = {};

    for (let i = 0; i < string.length; i++) {
        const char = caseSensitive ? string[i] : string[i].toLowerCase();

        if (charMap[char]) {
            charMap[char]++;
        } else {
            charMap[char] = 1;
        }
    }

    return charMap;
};

/**
 * Takes in a string and a list of words and returns a list of words that can be constructed from the string
 * Could be used to help play Scrabble.
 */
export const findWordsFromOptions = (input: string, wordOptions: string[], caseSensitive: boolean = true) => {
    if (input.length === 0) return [];

    // Break word into letters and letter counts
    const brokenDownInput = stringToCharMap(input, caseSensitive);

    // Go through each word in the englishWords and break it into letters and letter counts similarly
    return wordOptions.filter((word) => {

        // Return false immediately to optimize if the word is longer than the input as not possible to match
        if (word.length === 0 || word.length > input.length) return false;

        const brokenDownWord = stringToCharMap(word, caseSensitive);

        // If the word from the word list has less or same amount of letters as the input word then add it to matched words. But still has to have the same letters and letter counts
        return isCharMapContainedInCharMap(brokenDownInput, brokenDownWord);

    })
}