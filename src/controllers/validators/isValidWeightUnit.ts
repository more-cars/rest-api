export function isValidWeightUnit(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!["kg", "kg_EG", "kg_dry", "kg_DIN", "lbs"].includes(value)) {
        return false
    }

    return true
}
