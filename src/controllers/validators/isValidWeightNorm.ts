export function isValidWeightNorm(value: unknown) {
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
        "dry",
        "EG",
        "DIN",
    ].includes(value)) {
        return false
    }

    return true
}
