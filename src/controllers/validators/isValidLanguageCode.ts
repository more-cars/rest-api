import ISO6391 from 'iso-639-1'

export function isValidLanguageCode(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!ISO6391.validate(value.toLowerCase())) {
        return false
    }

    return true
}
