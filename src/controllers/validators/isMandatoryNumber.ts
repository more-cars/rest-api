export function isMandatoryNumber(value: unknown) {
    if (!value) {
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
