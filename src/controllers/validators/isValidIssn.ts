export function isValidIssn(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (!isValid(value)) {
        return false
    }

    return true
}

function isValid(input: string) {
    const issn = input.replace('-', '').toUpperCase()

    if (!/^\d{7}[\dX]$/.test(issn)) {
        return false
    }

    let sum = 0

    for (let i = 0; i < 7; i++) {
        sum += parseInt(issn[i], 10) * (8 - i)
    }

    const remainder = sum % 11
    const check = (11 - remainder) % 11

    const expectedCheckChar = check === 10 ? "X" : String(check)

    return issn[7] === expectedCheckChar
}
