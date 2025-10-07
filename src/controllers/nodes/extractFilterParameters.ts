import express from "express"
import type {FilterOperator} from "../../models/types/FilterOperator"

export function extractFilterParameters(req: express.Request): {
    filterByProperty: string | null,
    filterValue: string | null,
    filterOperator: FilterOperator | null,
} {
    const property = req.query.filter_by_property as string
    const value = req.query.filter_value as string
    const operator = req.query.filter_operator as string

    const filterByProperty = property ? property.toLowerCase().trim() : null
    const filterValue = value ? value.trim() : null
    const filterOperator = operator ? operator.toLowerCase().trim() as FilterOperator : null

    return {
        filterByProperty,
        filterValue,
        filterOperator,
    }
}
