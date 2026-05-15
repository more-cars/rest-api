export function isValidTorqueUnit(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!["Nm", "lb ft"].includes(value)) {
        return false
    }

    return true
}
