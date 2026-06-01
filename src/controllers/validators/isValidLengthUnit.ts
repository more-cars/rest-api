export function isValidLengthUnit(value: unknown) {
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
        "m",
        "km",
        "miles",
        "laps",
    ].includes(value)) {
        return false
    }

    return true
}
