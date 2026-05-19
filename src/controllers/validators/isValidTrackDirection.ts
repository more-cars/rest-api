export function isValidTrackDirection(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!['clockwise', 'counterclockwise'].includes(value)) {
        return false
    }

    return true
}
