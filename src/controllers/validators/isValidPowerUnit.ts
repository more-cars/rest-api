export function isValidPowerUnit(value: unknown) {
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
        "PS",
        "bhp",
        "kW",
    ].includes(value)) {
        return false
    }

    return true
}
