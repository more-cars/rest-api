export function isValidPublicationFormat(value: unknown) {
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
        "print",
        "digital",
        "print,digital",
        "other",
    ].includes(value)) {
        return false
    }

    return true
}
