export function isValidPowerNorm(value: unknown) {
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
        "DIN",
        "SAE",
    ].includes(value)) {
        return false
    }

    return true
}
