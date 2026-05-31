export function isValidConsumptionUnit(value: unknown) {
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
        "L/100 km",
        "kWh/100 km",
        "km/L",
        "mpg",
    ].includes(value)) {
        return false
    }

    return true
}
