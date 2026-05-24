export function isValidIsbn(value: unknown) {
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
    const isbn = input.replace(/[\s-]/g, "")

    // ISBN-10
    if (/^\d{9}[\dX]$/i.test(isbn)) {
        let sum = 0

        for (let i = 0; i < 9; i++) {
            sum += (i + 1) * Number(isbn[i])
        }

        const checkChar = isbn[9].toUpperCase()
        const checkValue = checkChar === "X" ? 10 : Number(checkChar)

        sum += 10 * checkValue

        return sum % 11 === 0
    }

    // ISBN-13
    if (/^\d{13}$/.test(isbn)) {
        let sum = 0

        for (let i = 0; i < 12; i++) {
            const digit = Number(isbn[i])
            sum += i % 2 === 0 ? digit : digit * 3
        }

        const expectedCheck = (10 - (sum % 10)) % 10
        const actualCheck = Number(isbn[12])

        return expectedCheck === actualCheck
    }

    return false
}
