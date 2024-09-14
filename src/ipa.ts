import { symbolDataTable } from "./runeDataset";

const IPADictURL = "./ipa_dict.json";

let IPADict: Record<string, string> = {};

export async function loadIPADict() {
    // Load the dictionary
    const response = await fetch(IPADictURL);
    IPADict = await response.json();

    const symbolsUsedInIPADict = new Set();
    let c = 0;
    for (const key in IPADict) {
        const tr = IPADict[key][0];
        tr.split(" ").forEach((w) => {
            if (!symbolsUsedInIPADict.has(w)) console.log(key);
            symbolsUsedInIPADict.add(w);
        });
    }
    console.log("Symbols used in ipa dict =", symbolsUsedInIPADict);
    const ipaCompliantSymbols = symbolDataTable.filter((y) =>
        symbolsUsedInIPADict.has(y.ipaSymbol),
    );
    const uniqueMasks = new Set();
    ipaCompliantSymbols.forEach((element) => {
        uniqueMasks.add(element.mask);
    });
    console.log(uniqueMasks);
    console.log(ipaCompliantSymbols);

    console.log(symbolsUsedInIPADict);
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
    let doInvalidWordsExist = false;
    // Match all sequences of letters, translate them if possible
    const translated = sentence.replace(/\p{Letter}+/gu, (word) => {
        if (word in IPADict) {
            return translateWord(word);
        } else {
            doInvalidWordsExist = true;
            return "";
        }
    });
    return doInvalidWordsExist ? null : translated;
}
