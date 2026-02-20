import {Neo4jNodeType} from "../types/Neo4jNodeType"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"

export function getAllNodesOfTypeQuery(nodeLabel: Neo4jNodeType, params: CollectionQueryParams) {
    return getCypherQueryTemplate('nodes/_cypher/getAllNodesOfType.cypher')
        .trim()
        .replace(':nodeLabel', `:${getNamespacedNodeTypeLabel(nodeLabel)}`)
        .replace('$sortByProperty', `${params.sortByProperty}`)
        .replace('$sortDirection', `${params.sortDirection}`)
        .replace('$filterByProperty', `${params.filterByProperty}`)
        .replace('$filterValue', ['boolean', 'number'].includes(typeof params.filterValue) ? `${params.filterValue}` : `'${params.filterValue}'`)
        .replace('$filterOperator', `${params.filterOperator}`)
        .replace('$offset', `${params.offset}`)
        .replace('$limit', `${params.limit}`)
}
