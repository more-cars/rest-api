export function removeDuplicates(input: Array<number>) {
    // creating a SET automatically removes the duplicates
    const inputSet = new Set(input)

    return [...inputSet]
}
