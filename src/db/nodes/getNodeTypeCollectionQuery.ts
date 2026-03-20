import {DbNodeType} from "../types/DbNodeType"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {mapDbNodeTypeToNeo4jNodeType} from "./mapDbNodeTypeToNeo4jNodeType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export function getNodeTypeCollectionQuery(nodeType: DbNodeType, params: CollectionQueryParams) {
    const nodeTypeLabel = getNamespacedNodeTypeLabel(mapDbNodeTypeToNeo4jNodeType(nodeType))

    if (params?.filterByProperty && params?.filterValue) {
        return getCypherQueryTemplate('nodes/_cypher/getNodeTypeCollectionFiltered.cypher')
            .trim()
            .replace(':nodeLabel', `:${nodeTypeLabel}`)
            .replace('$sortByProperty', `${params.sortByProperty}`)
            .replace('$sortDirection', `${params.sortDirection}`)
            .replace('$filterByProperty', `${params.filterByProperty}`)
            .replace('$filterOperator', `${params.filterOperator}`)
            .replace('$filterValue', ['boolean', 'number'].includes(typeof params.filterValue) ? `${params.filterValue}` : `'${params.filterValue}'`)
            .replace('$offset', `${params.offset}`)
            .replace('$limit', `${params.limit}`)
    } else {
        return getCypherQueryTemplate('nodes/_cypher/getNodeTypeCollection.cypher')
            .trim()
            .replace(':nodeLabel', `:${nodeTypeLabel}`)
            .replace('$sortByProperty', `${params.sortByProperty}`)
            .replace('$sortDirection', `${params.sortDirection}`)
            .replace('$offset', `${params.offset}`)
            .replace('$limit', `${params.limit}`)
    }
}
