import countries from "i18n-iso-countries"

export function isValidCountryCode(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!countries.isValid(value.toLowerCase())) {
        return false
    }

    return true
}
