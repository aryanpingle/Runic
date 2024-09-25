export interface SymbolData {
    ipaSymbol: string;
    mask: number;
    pronunciation: string;
    english: string;
    examples: string;
}

export const vowelDataTable: SymbolData[] = [
    {
        ipaSymbol: "æ",
        mask: 0b110011100000000,
        pronunciation: "a",
        english: "a",
        examples: "has, apple, ash",
    },
    {
        ipaSymbol: "ɑɹ",
        mask: 0b111100100000000,
        pronunciation: "ah",
        english: "ahr",
        examples: "arm, large, far",
    },
    // Same as 'ɔ' but not used in IPA dictionary
    // {
    //     ipaSymbol: "ɒ",
    //     mask: 0b100011100000000,
    //     english: "aw",
    //     examples: "box, awesome, swan",
    // },
    {
        ipaSymbol: "ɑ",
        mask: 0b100011100000000,
        pronunciation: "aw",
        english: "aw",
        examples: "box, awesome, swan",
    },
    {
        ipaSymbol: "ɔ",
        mask: 0b100011100000000,
        pronunciation: "aw",
        english: "aw",
        examples: "box, awesome, swan",
    },
    {
        ipaSymbol: "eɪ",
        mask: 0b100000100000000,
        pronunciation: "ay / ei",
        english: "ay",
        examples: "maid, break, they",
    },
    {
        ipaSymbol: "ɛ",
        mask: 0b101111000000000,
        pronunciation: "eh",
        english: "eh",
        examples: "end, bread, said",
    },
    {
        ipaSymbol: "i",
        mask: 0b101111100000000,
        pronunciation: "ee",
        english: "ee",
        examples: "bee, meat, key",
    },
    {
        ipaSymbol: "ɪɹ",
        mask: 0b101011100000000,
        pronunciation: "ear",
        english: "ear",
        examples: "ear, beer, steer",
    },
    {
        ipaSymbol: "ə",
        mask: 0b110000100000000,
        pronunciation: "uh",
        english: "uh",
        examples: "about, other, uhh",
    },
    {
        ipaSymbol: "ɛɹ",
        mask: 0b101011000000000,
        pronunciation: "air",
        english: "air",
        examples: "air, heir, there",
    },
    {
        ipaSymbol: "ɪ",
        mask: 0b101100000000000,
        pronunciation: "ee (sharp)",
        english: "ee",
        examples: "it, gym, brim",
    },
    {
        ipaSymbol: "aɪ",
        mask: 0b110000000000000,
        pronunciation: "aye",
        english: "aye",
        examples: "ice, spider, pie",
    },
    {
        ipaSymbol: "ɝ",
        mask: 0b111111000000000,
        pronunciation: "uhr",
        english: "uhr",
        examples: "bird, burn, pearl",
    },
    {
        ipaSymbol: "oʊ",
        mask: 0b111111100000000,
        pronunciation: "oh",
        english: "oh",
        examples: "open, boat, moan",
    },
    {
        ipaSymbol: "ɔɪ",
        mask: 0b100100000000000,
        pronunciation: "oi",
        english: "oi",
        examples: "join, boy, coin",
    },
    {
        ipaSymbol: "u",
        mask: 0b110111100000000,
        pronunciation: "oo (long)",
        english: "oo",
        examples: "who, blue, soon",
    },
    {
        ipaSymbol: "ʊ",
        mask: 0b100111000000000,
        pronunciation: "oo (short)",
        english: "oo",
        examples: "wolf, bush, would",
    },
    {
        ipaSymbol: "aʊ",
        mask: 0b101000000000000,
        pronunciation: "ow",
        english: "ow",
        examples: "now, shout, bow",
    },
    {
        ipaSymbol: "ɔɹ",
        mask: 0b111011100000000,
        pronunciation: "oar",
        english: "oar",
        examples: "tour, cure, sure",
    },
    {
        ipaSymbol: "ʊɹ",
        mask: 0b111011100000000,
        pronunciation: "our",
        english: "our",
        examples: "tour, cure, sure",
    },
];
export const VOWEL_MASK = 0b111111100000000;
export const consonantDataTable: SymbolData[] = [
    {
        ipaSymbol: "b",
        mask: 0b100000010100010,
        pronunciation: "b",
        english: "b",
        examples: "ball, abe, bird",
    },
    {
        ipaSymbol: "tʃ",
        mask: 0b100000000010110,
        pronunciation: "tch",
        english: "tch",
        examples: "watch, chair, future",
    },
    {
        ipaSymbol: "d",
        mask: 0b100000010101010,
        pronunciation: "d",
        english: "d",
        examples: "doll, damn, deep",
    },
    {
        ipaSymbol: "f",
        mask: 0b100000001011010,
        pronunciation: "f",
        english: "f",
        examples: "fall, fit, fill",
    },
    {
        ipaSymbol: "ɡ",
        mask: 0b100000001110010,
        pronunciation: "g",
        english: "guh",
        examples: "gun, egg, ghost",
    },
    {
        ipaSymbol: "h",
        mask: 0b100000010110010,
        pronunciation: "h",
        english: "h",
        examples: "hop, who, help",
    },
    {
        ipaSymbol: "dʒ",
        mask: 0b100000010001010,
        pronunciation: "juh",
        english: "j",
        examples: "jam, giraffe, edge",
    },
    {
        ipaSymbol: "k",
        mask: 0b100000011100010,
        pronunciation: "k",
        english: "k",
        examples: "mask, cat, rack",
    },
    {
        ipaSymbol: "l",
        mask: 0b100000010010010,
        pronunciation: "l",
        english: "l",
        examples: "live, well, land",
    },
    {
        ipaSymbol: "ɫ",
        mask: 0b100000010010010,
        pronunciation: "l",
        english: "l",
        examples: "live, well, land",
    },
    {
        ipaSymbol: "m",
        mask: 0b100000000101000,
        pronunciation: "m",
        english: "m",
        examples: "man, sum, comb",
    },
    {
        ipaSymbol: "n",
        mask: 0b100000000101100,
        pronunciation: "n",
        english: "n",
        examples: "no, never, nice",
    },
    {
        ipaSymbol: "ŋ",
        mask: 0b100000011111110,
        pronunciation: "ng",
        english: "ng",
        examples: "ring, pink, tongue",
    },
    {
        ipaSymbol: "p",
        mask: 0b100000001010010,
        pronunciation: "p",
        english: "p",
        examples: "pip, pretty, pop",
    },
    // Same as 'ɹ' but not used in IPA dictionary
    // {
    //     ipaSymbol: "r",
    //     mask: 0b100000011010010,
    //     english: "r",
    //     examples: "rice, rune, rim",
    // },
    {
        ipaSymbol: "ɹ",
        mask: 0b100000011010010,
        pronunciation: "r",
        english: "r",
        examples: "rice, rune, rim",
    },
    {
        ipaSymbol: "s",
        mask: 0b100000011011010,
        pronunciation: "s",
        english: "s",
        examples: "sit, less, circle",
    },
    {
        ipaSymbol: "ʃ",
        mask: 0b100000001111110,
        pronunciation: "sh",
        english: "sh",
        examples: "sham, sure, ocean",
    },
    {
        ipaSymbol: "t",
        mask: 0b100000001010110,
        pronunciation: "t",
        english: "t",
        examples: "tip, matter, tomato",
    },
    {
        ipaSymbol: "θ",
        mask: 0b100000011010110,
        pronunciation: "th (sharp)",
        english: "th",
        examples: "theta, theme, thaw",
    },
    {
        ipaSymbol: "ð",
        mask: 0b100000010111010,
        pronunciation: "th (soft)",
        english: "th",
        examples: "leather, the, them",
    },
    {
        ipaSymbol: "v",
        mask: 0b100000010100110,
        pronunciation: "v",
        english: "v",
        examples: "vine, five, very",
    },
    {
        ipaSymbol: "w",
        mask: 0b100000001000100,
        pronunciation: "w",
        english: "w",
        examples: "why, where, quick",
    },
    {
        ipaSymbol: "j",
        mask: 0b100000010010110,
        pronunciation: "yuh",
        english: "y",
        examples: "you, onion, yup",
    },
    {
        ipaSymbol: "z",
        mask: 0b100000010110110,
        pronunciation: "z",
        english: "z",
        examples: "zed, buzz, his",
    },
    {
        ipaSymbol: "ʒ",
        mask: 0b100000011101110,
        pronunciation: "sh",
        english: "zh",
        examples: "treasure, azure, division",
    },
];
export const CONSONANT_MASK = 0b100000011111110;
export const MIDDLE_LINE_MASK = 0b100000000000000;
export const symbolDataTable: SymbolData[] = [
    // Vowels
    ...vowelDataTable,
    // Consonants
    ...consonantDataTable,
].sort((a, b) => -(a.ipaSymbol.length - b.ipaSymbol.length));
// Map from symbol to symbol data
export const symbolToSymbolData = Object.fromEntries(
    symbolDataTable.map((symbolData) => [symbolData.ipaSymbol, symbolData]),
);
// Map from runeMask to symbol
export const runeMaskToSymbolData = Object.fromEntries(
    symbolDataTable.map((symbolData) => [symbolData.mask, symbolData]),
);

export function isVowel(symbol: string): boolean {
    return vowelDataTable.some((vowel) => symbol === vowel.ipaSymbol);
}

export function isConsonant(symbol: string): boolean {
    return consonantDataTable.some(
        (consonant) => symbol === consonant.ipaSymbol,
    );
}
