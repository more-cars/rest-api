export function isValidWeightUnit(value: unknown) {
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
        "kg",
        "lbs",
    ].includes(value)) {
        return false
    }

    return true
}
