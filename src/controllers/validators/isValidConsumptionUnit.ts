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

    if (!["l / 100 km", "mpg", "kWh / 100 km", "l / 100 km (NEDC)", "l / 100 km (WLTP)"].includes(value)) {
        return false
    }

    return true
}
