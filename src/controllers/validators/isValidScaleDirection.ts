export function isValidScaleDirection(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!['up', 'down'].includes(value)) {
        return false
    }

    return true
}
