export function isValidEngineType(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!["otto", "hybrid", "electric", "wankel", "diesel", "fuel_cell", "turbine", "other"].includes(value)) {
        return false
    }

    return true
}
