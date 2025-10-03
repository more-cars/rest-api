import express from "express"

export function extractSortingParameters(req: express.Request): {
    sortByProperty: string | null,
    sortDirection: string | null,
} {
    const property = req.query.sort_by_property as string
    const direction = req.query.sort_direction as string

    const sortByProperty = property ? property.toLowerCase().trim() : null
    const sortDirection = direction ? direction.toLowerCase().trim() : null

    return {
        sortByProperty,
        sortDirection,
    }
}
