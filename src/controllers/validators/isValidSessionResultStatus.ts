export function isValidSessionResultStatus(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!['Finished', 'DSQ', 'DNF', 'DNC', 'DNS', 'other'].includes(value)) {
        return false
    }

    return true
}
