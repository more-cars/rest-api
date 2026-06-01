export function isValidVideoProvider(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (![
        "youtube"
    ].includes(value)) {
        return false
    }

    return true
}
