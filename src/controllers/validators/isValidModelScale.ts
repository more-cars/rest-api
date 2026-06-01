export function isValidModelScale(value: unknown) {
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
        "1:64",
        "1:43",
        "1:24",
        "1:18",
        "1:10",
        "other",
    ].includes(value)) {
        return false
    }

    return true
}
