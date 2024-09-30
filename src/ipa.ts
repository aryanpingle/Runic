const IPADictURL = "./ipa_dict.json";

let IPADict: Record<string, string> = {};

export async function loadIPADict() {
    // Load the dictionary
    const response = await fetch(IPADictURL);
    IPADict = await response.json();
    console.log("Loaded IPA Dictionary.");
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
export function translateSentence(sentence: string): string {
    // Regex that matches characters that could be part of an IPA word
    const wordCharRegex = /[\p{Letter}']/u;
    let englishEscape = false;
    let result = "";
    let buffer = "";

    // Utilities
    function translateAndDumpBuffer() {
        const lowerCaseBuffer = buffer.toLowerCase();
        console.log("Tryna translate ", lowerCaseBuffer);
        if (lowerCaseBuffer in IPADict) {
            // Add the translated word to the result
            const translation = IPADict[lowerCaseBuffer];
            result += translation;
            buffer = "";
        } else {
            // Ignore this word
            buffer = "";
        }
    }

    // Parse each character of the English input
    for (let i = 0; i < sentence.length; ++i) {
        const c = sentence.charAt(i);

        // If this is part of an english-escaped sequence,
        // just add it bro.
        if (englishEscape === true) {
            result += c;
            if (c === "@") {
                englishEscape = false;
            }
            continue;
        }

        // Start of an english-escaped sequence
        if (c === "@") {
            translateAndDumpBuffer();
            result += c;
            englishEscape = true;
            continue;
        }

        // Punctuation
        if (!wordCharRegex.test(c)) {
            translateAndDumpBuffer();
            result += c;
            continue;
        }

        // Whatever it is, must be a character of a valid word
        // (not necessarily translatable)
        buffer += c;

        // If this is the last character
        if (i === sentence.length - 1) {
            translateAndDumpBuffer();
        }
    }

    return result;
}
