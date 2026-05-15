export function isValidEnergySource(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!["petrol", "electricity", "diesel", "hydrogen", "ethanol"].includes(value)) {
        return false
    }

    return true
}
