export function isValidPaginationValue(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== 'number') {
        return false
    }

    if (Number.isNaN(value)) {
        return false
    }

    if (!Number.isInteger(value)) {
        return false
    }

    if (value <= 0) {
        return false
    }

    return true
}
