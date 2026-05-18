export function isValidDate(value: unknown) {
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

export function isValid(value: string): boolean {
    try {
        Temporal.PlainDate.from(value)
        return true
    } catch {
        return false
    }
}
