export function removeDuplicates(input: number[]) {
    // creating a SET automatically removes the duplicates
    const inputSet = new Set(input)

    return [...inputSet]
}
