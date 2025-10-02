import {NodeTypeLabel} from "../NodeTypeLabel"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export function getAllNodesOfTypeQuery(nodeLabel: NodeTypeLabel, params: CollectionQueryParams = {
    limit: 100,
    offset: 0
}) {
    return getCypherQueryTemplate('nodes/_cypher/getAllNodesOfType.cypher')
        .trim()
        .replace(':nodeLabel', `:${nodeLabel}`)
        .replace('$offset', `${params.offset}`)
        .replace('$limit', `${params.limit}`)
}
