export function isValidVehicleType(value: unknown) {
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
        "open-wheel-cars",
        "rally-cars",
        "touring-cars",
        "gt-cars",
        "stock-cars",
        "other",
    ].includes(value)) {
        return false
    }

    return true
}
