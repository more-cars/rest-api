export function isValidSortingDirection(value: unknown) {
    if (value === null) {
        return true
    }

    if (typeof value !== 'string') {
        return false
    }

    if (value === '') {
        return true
    }

    if (value === 'asc' || value === 'desc') {
        return true
    }

    return false
}
