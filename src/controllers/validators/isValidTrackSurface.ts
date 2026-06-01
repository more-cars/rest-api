export function isValidTrackSurface(value: unknown) {
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
        "asphalt",
        "mixed",
        "other",
    ].includes(value)) {
        return false
    }

    return true
}
