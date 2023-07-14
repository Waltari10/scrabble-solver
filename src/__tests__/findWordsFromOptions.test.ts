import wordlist from 'wordlist-english';

import { findWordsFromOptions } from "../findWordsFromOptions";

// Lower the number the more common the words imported are from wordlist-english library.
const englishWords = wordlist['english/20'];

describe('findWordsFromOptions', () => {
    it('Should find words from oogd string', () => {
        const res = findWordsFromOptions('oogd', ["foo", "moo", "", "good", "god", "dog", "goo", "do", "go", "Good"]);

        expect(res).toEqual(["good", "god", "dog", "goo", "do", "go"])
    });

    it('Should find words even when using emojis', () => {
        const res = findWordsFromOptions('👉📱', ["🔥", "💥💥", "📱👉", "🩸", "📱", "👉", "", "foo"]);

        expect(res).toEqual(["📱👉", "📱", "👉"])
    });


    it('Should find words with special chars', () => {
        const res = findWordsFromOptions('...!?', ["...", "!?", "*€#", "ääåö"]);

        expect(res).toEqual(["...", "!?"])
    });


    it('Should find words with number strings', () => {
        const res = findWordsFromOptions('100', ["100", "101", "001", "1345", "0", "5", "000"]);

        expect(res).toEqual(["100", "001", "0"])
    });



    it("Should find words that aren't case sensitive", () => {
        const res = findWordsFromOptions('oogd', ["foo", "moo", "", "good", "GOOD", "god", "dog", "goo", "do", "go", "Good"], false);

        expect(res).toEqual(["good", "GOOD", "god", "dog", "goo", "do", "go", "Good"])
    });


    it('Should find words from large dictionary', () => {
        const res = findWordsFromOptions('Valtteri', englishWords);

        expect(res).toEqual([
            "alert",
            "ear",
            "era",
            "irate",
            "lit",
            "litter",
            "rail",
            "rat",
            "rattle",
            "retail",
            "tail",
            "tale",
            "tear",
            "tile",
            "tire",
            "trail"])
    });
});