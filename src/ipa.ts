const IPADictURL = "./ipa_dict.json";

let IPADict: Record<string, string> = {};

export async function loadIPADict() {
    // Load the dictionary
    const response = await fetch(IPADictURL);
    IPADict = await response.json();
    console.log("Loaded IPA Dictionary.")
}

/**
 * Convert a word from English to Phonetic.
 */
export function translateWord(word: string): string | null {
    return word in IPADict ? IPADict[word] : null;
}

/**
 * Convert a sentence from English to Phonetic.
 */
export function translateSentence(sentence: string): string | null {
    // Match all sequences of letters, translate them if possible

    let englishEscape = false;
    const punctuationRegex = /[^\s\n\.,?!\-]+/gu;
    return sentence.replace(punctuationRegex, (word) => {
        const startsWithAt = word.startsWith("@");
        const endsWithAt = word.endsWith("@");

        if (startsWithAt && endsWithAt) {
            // Start and end english sequence
            return word;
        } else if (startsWithAt) {
            // Start english sequence
            englishEscape = true;
            return word;
        } else if (endsWithAt) {
            // End english sequence
            englishEscape = false;
            return word;
        } else if (englishEscape) {
            // Continue english sequence
            return word;
        }

        const lowerCaseWord = word.toLowerCase();
        if (lowerCaseWord in IPADict) {
            return translateWord(lowerCaseWord);
        } else {
            return "";
        }
    });
}
