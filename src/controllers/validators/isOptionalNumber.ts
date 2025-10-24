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

    if (Number.isNaN(value)) {
        return false
    }

    return true
}
