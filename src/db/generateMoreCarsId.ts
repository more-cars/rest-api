import {OutOfRangeError} from "./types/OutOfRangeError"

/**
 * The database generates IDs that start at zero.
 * But a More Cars ID is only valid when it is a number between 12,000,000 and 99,999,999.
 * To close the gap this function just adds 12 million to the provided number.
 * ⚠️ Uniqueness is not ensured. The caller is responsible for providing valid IDs.
 */
export function generateMoreCarsId(baseId: number): number {
    if (baseId > 87999999) {
        throw new OutOfRangeError(`The provided ID "${baseId}" is too large. "87999999" is the allowed maximum.`)
    }

    return baseId + 12000000
}
