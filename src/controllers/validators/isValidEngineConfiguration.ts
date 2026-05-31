export function isValidEngineConfiguration(value: unknown) {
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
        "inline",
        "v",
        "flat",
        "rotary",
        "w",
        "other",
    ].includes(value)) {
        return false
    }

    return true
}
