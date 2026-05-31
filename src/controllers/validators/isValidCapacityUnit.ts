export function isValidCapacityUnit(value: unknown) {
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
        "l",
        "kWh",
        "gal",
        "kg"
    ].includes(value)) {
        return false
    }

    return true
}
