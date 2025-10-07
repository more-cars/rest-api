import {FilterOperator} from "../../models/types/FilterOperator"

export function isValidFilterOperator(value: unknown) {
    if (value === null) {
        return true
    }

    if (typeof value !== 'string') {
        return false
    }

    if (value === '') {
        return true
    }

    if ((Object.values(FilterOperator) as string[]).includes(value)) {
        return true
    }

    return false
}
