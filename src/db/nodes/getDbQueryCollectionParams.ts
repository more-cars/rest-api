import type {NodeCollectionConstraints} from "../../models/types/NodeCollectionConstraints"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"
import {DbFilterOperator} from "../types/DbFilterOperator"
import {FilterOperator} from "../../models/types/FilterOperator"

export function getDbQueryCollectionParams(constraints: NodeCollectionConstraints = {}): CollectionQueryParams {
    const sortByProperty = constraints.sortByProperty ? getDbProperty(constraints.sortByProperty) : 'mc_id'
    const sortDirection = constraints.sortDirection ? constraints.sortDirection.toUpperCase() : 'ASC'

    let filterByProperty, filterValue, filterOperator
    if (!constraints.filterByProperty || !constraints.filterValue) {
        filterByProperty = 'mc_id'
        filterValue = '-1'
        filterOperator = DbFilterOperator.not_equal
    } else {
        filterByProperty = getDbProperty(constraints.filterByProperty)
        filterValue = constraints.filterValue
        filterOperator = constraints.filterOperator ? getDbFilterOperator(constraints.filterOperator) : DbFilterOperator.equal
    }

    const page = constraints.page || 1
    const limit = 100
    const offset = (page - 1) * limit

    return {
        sortByProperty,
        sortDirection,
        filterByProperty,
        filterValue,
        filterOperator,
        offset,
        limit,
    }
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
