export function isValidMotorShowFocus(value: unknown) {
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
        "new-cars",
        "oldtimer",
        "other",
    ].includes(value)) {
        return false
    }

    return true
}
