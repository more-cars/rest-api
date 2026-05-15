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

    if (!["Inline", "V", "Flat", "Rotary", "W"].includes(value)) {
        return false
    }

    return true
}
