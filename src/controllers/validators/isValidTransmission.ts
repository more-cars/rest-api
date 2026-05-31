export function isValidTransmission(value: unknown) {
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
        "manual",
        "dual-clutch",
        "automatic",
        "sequential",
        "automated-manual",
        "cvt",
        "other",
    ].includes(value)) {
        return false
    }

    return true
}
