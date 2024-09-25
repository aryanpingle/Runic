// Bit manipulation utilities

export function getBit(bitmask: number, exponent: number): number {
    return (bitmask >> exponent) & 1;
}

export function isBitSet(bitmask: number, exponent: number): boolean {
    return getBit(bitmask, exponent) === 1;
}

export function setBits(bitmask: number, ...exponents: number[]): number {
    let newBitmask = bitmask;
    exponents.forEach((exponent) => {
        newBitmask = setBit(newBitmask, exponent);
    });
    return newBitmask;
}

export function setBit(bitmask: number, exponent: number): number {
    return bitmask | (1 << exponent);
}
function toggleBit(bitmask: number, exponent: number): number {
    return bitmask ^ (1 << exponent);
}

export function unsetBits(bitmask: number, ...exponents: number[]): number {
    let newBitmask = bitmask;
    exponents.forEach((exponent) => {
        newBitmask = unsetBit(newBitmask, exponent);
    });
    return newBitmask;
}

export function unsetBit(bitmask: number, exponent: number): number {
    if (isBitSet(bitmask, exponent)) {
        return toggleBit(bitmask, exponent);
    } else {
        return bitmask;
    }
}
