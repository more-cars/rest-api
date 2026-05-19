export function isValidMagazineFocus(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!["new cars", "sports cars", "classic cars", "brand specific", "race cars", "tuned cars", "american cars", "mixed", "other"].includes(value)) {
        return false
    }

    return true
}
