import type {NodeCollectionConstraints} from "../../models/types/NodeCollectionConstraints"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"
import {DbFilterOperator} from "../types/DbFilterOperator"
import {FilterOperator} from "../../models/types/FilterOperator"

export function getDbQueryCollectionParams(constraints: NodeCollectionConstraints = {}): CollectionQueryParams {
    const params: CollectionQueryParams = {}

    if (constraints.sortByProperty) {
        params.sortByProperty = getDbProperty(constraints.sortByProperty)
    }

    if (constraints.sortDirection) {
        params.sortDirection = getDbProperty(constraints.sortDirection.toUpperCase())
    }

    if (constraints.filterByProperty && constraints.filterValue) {
        params.filterByProperty = getDbProperty(constraints.filterByProperty)
        params.filterOperator = constraints.filterOperator ? getDbFilterOperator(constraints.filterOperator) : DbFilterOperator.equal
        params.filterValue = constraints.filterValue
    }

    const page = constraints.page || 1
    params.limit = 100
    params.offset = (page - 1) * params.limit

    return params
}

function getDbFilterOperator(filterOperator: FilterOperator): DbFilterOperator {
    const mapping = new Map<FilterOperator, DbFilterOperator>([
        [FilterOperator.equal, DbFilterOperator.equal],
        [FilterOperator.not_equal, DbFilterOperator.not_equal],
        [FilterOperator.lesser_than, DbFilterOperator.lesser_than],
        [FilterOperator.greater_than, DbFilterOperator.greater_than],
        [FilterOperator.lesser_than_equal, DbFilterOperator.lesser_than_equal],
        [FilterOperator.greater_than_equal, DbFilterOperator.greater_than_equal],
    ])

    return mapping.get(filterOperator) as DbFilterOperator
}

function getDbProperty(modelProperty: string) {
    if (modelProperty === 'id') {
        return 'mc_id'
    }

    return modelProperty
}
