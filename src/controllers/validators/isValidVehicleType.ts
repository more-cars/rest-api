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

    if (!['formula racing cars', 'rally cars', 'touring cars', 'sports cars', 'other'].includes(value)) {
        return false
    }

    return true
}
