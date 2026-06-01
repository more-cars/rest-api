export function isValidTrackType(value: unknown) {
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
        "permanent-race-track",
        "street-circuit",
        "other",
    ].includes(value)) {
        return false
    }

    return true
}
