export function isValidBodyStyle(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!["coupe", "convertible", "formula race car", "hatchback", "kei car", "minivan", "offroad", "pickup truck", "roadster", "sedan", "station wagon", "suv", "t-top", "targa", "truck", "van", "other"].includes(value)) {
        return false
    }

    return true
}
