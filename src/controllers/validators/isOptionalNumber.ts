export function isOptionalNumber(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "number") {
        return false
    }

    return true
}
