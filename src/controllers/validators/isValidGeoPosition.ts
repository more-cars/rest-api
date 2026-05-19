export function isValidGeoPosition(value: unknown) {
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
    const dmsRegex =
        /^([0-8]?\d|90)°([0-5]?\d)′([0-5]?\d)″([NS])\s+([0-1]?[0-7]?\d|180)°([0-5]?\d)′([0-5]?\d)″([EW])$/

    const match = value.match(dmsRegex)

    return !!match
}
