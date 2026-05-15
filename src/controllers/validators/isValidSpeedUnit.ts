export function isValidSpeedUnit(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!["km/h", "mph"].includes(value)) {
        return false
    }

    return true
}
