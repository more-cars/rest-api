export function isMandatoryString(value: unknown) {
    if (!value) {
        return false
    }

    if (typeof value !== "string") {
        return false
    }

    return true
}
