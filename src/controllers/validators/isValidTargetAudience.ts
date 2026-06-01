export function isValidTargetAudience(value: unknown) {
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
        "international",
        "national",
        "regional",
        "other",
    ].includes(value)) {
        return false
    }

    return true
}
