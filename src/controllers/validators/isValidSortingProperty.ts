export function isValidSortingProperty(property: unknown, validProperties: string[]) {
    if (property === null) {
        return true
    }

    if (property === undefined) {
        return true
    }

    if (typeof property !== 'string') {
        return false
    }

    if (property === '') {
        return true
    }

    return validProperties.includes(property.toLowerCase())
}
