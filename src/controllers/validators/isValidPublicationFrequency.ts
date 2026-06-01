export function isValidPublicationFrequency(value: unknown) {
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
        "yearly",
        "twice-a-year",
        "quarterly",
        "every-two-months",
        "every-six-weeks",
        "monthly",
        "twice-per-month",
        "weekly",
        "irregular",
        "other",
    ].includes(value)) {
        return false
    }

    return true
}
