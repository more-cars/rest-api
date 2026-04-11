import {DbNodeType} from "../types/DbNodeType"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {mapDbNodeTypeToNeo4jNodeType} from "./mapDbNodeTypeToNeo4jNodeType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {escapeSingleQuotes} from "./escapeSingleQuotes"

export function getNodeTypeCollectionQuery(nodeType: DbNodeType, params: CollectionQueryParams) {
    const nodeTypeLabel = getNamespacedNodeTypeLabel(mapDbNodeTypeToNeo4jNodeType(nodeType))

    if (params?.filterByProperty && params?.filterValue) {
        let filterValue = params.filterValue
        if (typeof filterValue === "string") {
            filterValue = `'${escapeSingleQuotes(filterValue)}'`
        } else {
            filterValue = `${filterValue}`
        }

        return getCypherQueryTemplate('nodes/_cypher/getNodeTypeCollectionFiltered.cypher')
            .trim()
            .replace(':nodeLabel', `:${nodeTypeLabel}`)
            .replace('$sortByProperty', `${params.sortByProperty}`)
            .replace('$sortDirection', `${params.sortDirection}`)
            .replace('$filterByProperty', `${params.filterByProperty}`)
            .replace('$filterOperator', `${params.filterOperator}`)
            .replace('$filterValue', filterValue)
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
