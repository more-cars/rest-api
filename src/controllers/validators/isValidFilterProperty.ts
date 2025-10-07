export function isValidFilterProperty(property: unknown, validProperties: string[]) {
    if (property === null) {
        return true
    }

    if (typeof property !== 'string') {
        return false
    }

    return validProperties.includes(property)
}
