export function isValidMotorShowFocus(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!['new_cars', 'other'].includes(value)) {
        return false
    }

    return true
}
