import type {DbFilterOperator} from "./DbFilterOperator"

export type CollectionQueryParams = {
    sortByProperty: string
    sortDirection: string
    filterByProperty: string
    filterValue: string | number | boolean
    filterOperator: DbFilterOperator
    offset: number
    limit: number
}
