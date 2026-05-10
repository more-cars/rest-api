export function isValidImageProvider(value: unknown) {
    if (!value) {
        return false
    }

    if (typeof value !== "string") {
        return false
    }

    if (!['wikimedia', 'flickr'].includes(value)) {
        return false
    }

    return true
}
