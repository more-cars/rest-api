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

    if (!["new cars", "sports cars", "classic cars", "other", "brand specific", "race cars", "tuned cars", "american cars", "mixed"].includes(value)) {
        return false
    }

    return true
}
