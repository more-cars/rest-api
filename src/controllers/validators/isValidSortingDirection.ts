export function isValidSortingDirection(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== 'string') {
        return false
    }

    if (value === '') {
        return true
    }

    if (value.toLowerCase() === 'asc' || value.toLowerCase() === 'desc') {
        return true
    }

    return false
}
