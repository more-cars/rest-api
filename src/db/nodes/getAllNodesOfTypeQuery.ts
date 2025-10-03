import {NodeTypeLabel} from "../NodeTypeLabel"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export function getAllNodesOfTypeQuery(nodeLabel: NodeTypeLabel, params: CollectionQueryParams) {
    return getCypherQueryTemplate('nodes/_cypher/getAllNodesOfType.cypher')
        .trim()
        .replace(':nodeLabel', `:${nodeLabel}`)
        .replace('$sortByProperty', `${params.sortByProperty}`)
        .replace('$sortDirection', `${params.sortDirection}`)
        .replace('$offset', `${params.offset}`)
        .replace('$limit', `${params.limit}`)
}
