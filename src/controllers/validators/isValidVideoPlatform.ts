export function isValidVideoPlatform(value: unknown) {
    if (!value) {
        return false
    }

    if (typeof value !== "string") {
        return false
    }

    if (!['youtube'].includes(value)) {
        return false
    }

    return true
}
