export function isValidPaginationValue(value: unknown) {
    if (value === null) {
        return true
    }

    if (typeof value !== 'number') {
        return false
    }

    if (isNaN(value)) {
        return false
    }

    if (value <= 0) {
        return false
    }

    return true
}
