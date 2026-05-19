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

    if (!["none", "turbo", "super", "turbo_and_supercharged", "other"].includes(value)) {
        return false
    }

    return true
}
