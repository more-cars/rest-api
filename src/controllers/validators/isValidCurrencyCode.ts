import cc from 'currency-codes'

export function isValidCurrencyCode(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!cc.code(value.toUpperCase())) {
        return false
    }

    return true
}
