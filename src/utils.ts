export function countSetBits(bitstring: number) {
    let count = 0;
    while (bitstring != 0) {
        count += bitstring % 2;
        bitstring = bitstring >> 1;
    }
    return count;
}
