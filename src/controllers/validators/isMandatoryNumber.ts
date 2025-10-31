export function isMandatoryNumber(value: unknown) {
    if (value === null) {
        return false
    }

    if (value === undefined) {
        return false
    }

    if (typeof value !== "number") {
        return false
    }

    if (Number.isNaN(value)) {
        return false
    }

    return true
}
