export function isValidDrivetrain(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!["RWD", "AWD", "FWD"].includes(value)) {
        return false
    }

    return true
}
