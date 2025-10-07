import type {FilterOperator} from "./FilterOperator"

export type NodeCollectionConstraints = {
    page?: number | null
    sortByProperty?: string | null
    sortDirection?: string | null
    filterByProperty?: string | null
    filterValue?: string | number | boolean | null
    filterOperator?: FilterOperator | null
}
