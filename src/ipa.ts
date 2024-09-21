import { symbolDataTable } from "./runeDataset";

const IPADictURL = "./ipa_dict.json";

let IPADict: Record<string, string> = {};

export async function loadIPADict() {
    // Load the dictionary
    const response = await fetch(IPADictURL);
    IPADict = await response.json();
}

/**
 * Convert a word from English to Phonetic.
 */
export function translateWord(word: string): string | null {
    return word in IPADict ? IPADict[word][0].replace(/\s+/g, "") : null;
}

/**
 * Convert a sentence from English to Phonetic.
 */
export function translateSentence(sentence: string): string | null {
    // Match all sequences of letters, translate them if possible
    return sentence.replace(/[\p{Letter}']+/gu, (word) => {
        if (word in IPADict) {
            return translateWord(word);
        } else {
            return word;
        }
    });
}
