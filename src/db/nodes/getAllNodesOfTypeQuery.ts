import {NodeTypeLabel} from "../NodeTypeLabel"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export function getAllNodesOfTypeQuery(nodeLabel: NodeTypeLabel, params: CollectionQueryParams) {
    return getCypherQueryTemplate('nodes/_cypher/getAllNodesOfType.cypher')
        .trim()
        .replace(':nodeLabel', `:${nodeLabel}`)
        .replace('$sortByProperty', `${params.sortByProperty}`)
        .replace('$sortDirection', `${params.sortDirection}`)
        .replace('$filterByProperty', `${params.filterByProperty}`)
        .replace('$filterValue', ['boolean', 'number'].includes(typeof params.filterValue) ? `${params.filterValue}` : `'${params.filterValue}'`)
        .replace('$filterOperator', `${params.filterOperator}`)
        .replace('$offset', `${params.offset}`)
        .replace('$limit', `${params.limit}`)
}
