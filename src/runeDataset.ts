export interface SymbolData {
    ipaSymbol: string;
    mask: number;
    english: string;
    examples: string;
}
export const vowelDataTable: SymbolData[] = [
    {
        ipaSymbol: "æ",
        mask: 0b110011100000000,
        english: "a",
        examples: "has, apple, ash",
    },
    {
        ipaSymbol: "ɑɹ",
        mask: 0b111100100000000,
        english: "ah",
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
        english: "aw",
        examples: "box, awesome, swan",
    },
    {
        ipaSymbol: "ɔ",
        mask: 0b100011100000000,
        english: "aw",
        examples: "box, awesome, swan",
    },
    {
        ipaSymbol: "eɪ",
        mask: 0b100000100000000,
        english: "ay/ei",
        examples: "maid, break, they",
    },
    {
        ipaSymbol: "ɛ",
        mask: 0b101111000000000,
        english: "eh",
        examples: "end, bread, said",
    },
    {
        ipaSymbol: "i",
        mask: 0b101111100000000,
        english: "ee",
        examples: "bee, meat, key",
    },
    {
        ipaSymbol: "ɪɹ",
        mask: 0b101011100000000,
        english: "ear",
        examples: "ear, beer, steer",
    },
    {
        ipaSymbol: "ə",
        mask: 0b110000100000000,
        english: "uh",
        examples: "about, other, uhh",
    },
    {
        ipaSymbol: "ɛɹ",
        mask: 0b101011000000000,
        english: "air",
        examples: "air, heir, there",
    },
    {
        ipaSymbol: "ɪ",
        mask: 0b101100000000000,
        english: "i",
        examples: "it, gym, brim",
    },
    {
        ipaSymbol: "aɪ",
        mask: 0b110000000000000,
        english: "aye",
        examples: "ice, spider, pie",
    },
    {
        ipaSymbol: "ɝ",
        mask: 0b111111000000000,
        english: "uhr",
        examples: "bird, burn, pearl",
    },
    {
        ipaSymbol: "oʊ",
        mask: 0b111111100000000,
        english: "oh",
        examples: "open, boat, moan",
    },
    {
        ipaSymbol: "ɔɪ",
        mask: 0b100100000000000,
        english: "oi",
        examples: "join, boy, coin",
    },
    {
        ipaSymbol: "u",
        mask: 0b110111100000000,
        english: "oo (long)",
        examples: "who, blue, soon",
    },
    {
        ipaSymbol: "ʊ",
        mask: 0b100111000000000,
        english: "oo (short)",
        examples: "wolf, bush, would",
    },
    {
        ipaSymbol: "aʊ",
        mask: 0b101000000000000,
        english: "ow",
        examples: "now, shout, bow",
    },
    {
        ipaSymbol: "ɔɹ",
        mask: 0b111011100000000,
        english: "our",
        examples: "tour, cure, sure",
    },
    {
        ipaSymbol: "ʊɹ",
        mask: 0b111011100000000,
        english: "our",
        examples: "tour, cure, sure",
    },
];
export const VOWEL_MASK = 0b111111100000000;
export const consonantDataTable: SymbolData[] = [
    {
        ipaSymbol: "b",
        mask: 0b100000010100010,
        english: "b",
        examples: "ball, abe, bird",
    },
    {
        ipaSymbol: "tʃ",
        mask: 0b100000000010110,
        english: "tch",
        examples: "watch, chair, future",
    },
    {
        ipaSymbol: "d",
        mask: 0b100000010101010,
        english: "d",
        examples: "doll, damn, deep",
    },
    {
        ipaSymbol: "f",
        mask: 0b100000001011010,
        english: "f",
        examples: "fall, fit, fill",
    },
    {
        ipaSymbol: "ɡ",
        mask: 0b100000001110010,
        english: "g",
        examples: "gun, egg, ghost",
    },
    {
        ipaSymbol: "h",
        mask: 0b100000010110010,
        english: "h",
        examples: "hop, who, help",
    },
    {
        ipaSymbol: "dʒ",
        mask: 0b100000010001010,
        english: "dj",
        examples: "jam, giraffe, edge",
    },
    {
        ipaSymbol: "k",
        mask: 0b100000011100010,
        english: "k",
        examples: "mask, cat, rack",
    },
    {
        ipaSymbol: "l",
        mask: 0b100000010010010,
        english: "l",
        examples: "live, well, land",
    },
    {
        ipaSymbol: "ɫ",
        mask: 0b100000010010010,
        english: "l",
        examples: "live, well, land",
    },
    {
        ipaSymbol: "m",
        mask: 0b100000000101000,
        english: "m",
        examples: "man, sum, comb",
    },
    {
        ipaSymbol: "n",
        mask: 0b100000000101100,
        english: "n",
        examples: "no, never, nice",
    },
    {
        ipaSymbol: "ŋ",
        mask: 0b100000011111110,
        english: "ng",
        examples: "ring, pink, tongue",
    },
    {
        ipaSymbol: "p",
        mask: 0b100000001010010,
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
        english: "r",
        examples: "rice, rune, rim",
    },
    {
        ipaSymbol: "s",
        mask: 0b100000011011010,
        english: "s",
        examples: "sit, less, circle",
    },
    {
        ipaSymbol: "ʃ",
        mask: 0b100000001111110,
        english: "sh",
        examples: "sham, sure, ocean",
    },
    {
        ipaSymbol: "t",
        mask: 0b100000001010110,
        english: "t",
        examples: "tip, matter, tomato",
    },
    {
        ipaSymbol: "θ",
        mask: 0b100000011010110,
        english: "th (sharp)",
        examples: "theta, theme, thaw",
    },
    {
        ipaSymbol: "ð",
        mask: 0b100000010111010,
        english: "th (soft)",
        examples: "leather, the, them",
    },
    {
        ipaSymbol: "v",
        mask: 0b100000010100110,
        english: "v",
        examples: "vine, five, very",
    },
    {
        ipaSymbol: "w",
        mask: 0b100000001000100,
        english: "w",
        examples: "why, where, quick",
    },
    {
        ipaSymbol: "j",
        mask: 0b100000010010110,
        english: "yuh",
        examples: "you, onion, yup",
    },
    {
        ipaSymbol: "z",
        mask: 0b100000010110110,
        english: "z",
        examples: "zed, buzz, his",
    },
    {
        ipaSymbol: "ʒ",
        mask: 0b100000011101110,
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
