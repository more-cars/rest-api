import {DbNodeType} from "../types/DbNodeType"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {mapDbNodeTypeToNeo4jNodeType} from "./mapDbNodeTypeToNeo4jNodeType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export function getAllNodesOfTypeQuery(nodeType: DbNodeType, params: CollectionQueryParams) {
    const nodeTypeLabel = getNamespacedNodeTypeLabel(mapDbNodeTypeToNeo4jNodeType(nodeType))

    return getCypherQueryTemplate('nodes/_cypher/getAllNodesOfType.cypher')
        .trim()
        .replace(':nodeLabel', `:${nodeTypeLabel}`)
        .replace('$sortByProperty', `${params.sortByProperty}`)
        .replace('$sortDirection', `${params.sortDirection}`)
        .replace('$filterByProperty', `${params.filterByProperty}`)
        .replace('$filterValue', ['boolean', 'number'].includes(typeof params.filterValue) ? `${params.filterValue}` : `'${params.filterValue}'`)
        .replace('$filterOperator', `${params.filterOperator}`)
        .replace('$offset', `${params.offset}`)
        .replace('$limit', `${params.limit}`)
}
