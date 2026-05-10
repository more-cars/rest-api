export function isValidImageProvider(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!['wikimedia', 'flickr'].includes(value)) {
        return false
    }

    return true
}
