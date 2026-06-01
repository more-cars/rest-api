import type {DbFilterOperator} from "./DbFilterOperator"

export type CollectionQueryParams = {
    sortByProperty?: string
    sortByPropertyValuesDatatype?: string | number | boolean
    sortDirection?: string
    filterByProperty?: string
    filterValue?: string | number | boolean
    filterOperator?: DbFilterOperator
    offset?: number
    limit?: number
}
