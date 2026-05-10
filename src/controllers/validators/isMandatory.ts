export function isMandatory(value: unknown) {
    if (value === null) {
        return false
    }

    if (value === undefined) {
        return false
    }

    if (typeof value === 'string') {
        return !!value
    }

    if (typeof value === 'number') {
        return !isNaN(value)
    }

    return true
}
