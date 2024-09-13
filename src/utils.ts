export function querySelectorArray(
    selector: string,
    queryTarget: ParentNode = document,
): HTMLElement[] {
    return Array.from(queryTarget.querySelectorAll(selector));
}
export function countSetBits(bitstring: number) {
    let count = 0;
    while (bitstring != 0) {
        count += bitstring % 2;
        bitstring = bitstring >> 1;
    }
    return count;
}
