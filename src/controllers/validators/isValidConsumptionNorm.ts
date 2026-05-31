export function isValidConsumptionNorm(value: unknown) {
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
        "NEDC",
        "WLTP",
    ].includes(value)) {
        return false
    }

    return true
}
