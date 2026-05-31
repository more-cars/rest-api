export function isValidAirInduction(value: unknown) {
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
        "naturally-aspirated",
        "turbocharged",
        "supercharged",
        "turbocharged,supercharged",
        "other",
    ].includes(value)) {
        return false
    }

    return true
}
