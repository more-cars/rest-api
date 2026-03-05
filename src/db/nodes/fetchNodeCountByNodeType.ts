import neo4j, {type Session} from "neo4j-driver"
import type {DbNodeType} from "../types/DbNodeType"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"
import {DbFilterOperator} from "../types/DbFilterOperator"
import {getDriver} from "../driver"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {mapDbNodeTypeToNeo4jNodeType} from "./mapDbNodeTypeToNeo4jNodeType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function fetchNodeCountByNodeType(nodeType: DbNodeType, params: CollectionQueryParams = {
    sortByProperty: '',
    sortDirection: '',
    filterByProperty: 'mc_id',
    filterValue: -1,
    filterOperator: DbFilterOperator.not_equal,
    offset: 0,
    limit: 0,
}) {
    const driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(fetchNodeCountByNodeTypeQuery(nodeType, params))
        return result.records
    })

    await session.close()

    return records[0].get('nodeCount') as number
}

export function fetchNodeCountByNodeTypeQuery(nodeType: DbNodeType, params: CollectionQueryParams) {
    const nodeTypeLabel = getNamespacedNodeTypeLabel(mapDbNodeTypeToNeo4jNodeType(nodeType))

    return getCypherQueryTemplate('nodes/_cypher/getNodeCountByNodeLabel.cypher')
        .trim()
        .replace(':nodeLabel', `:${nodeTypeLabel}`)
        .replace('$filterByProperty', `${params.filterByProperty}`)
        .replace('$filterValue', ['boolean', 'number'].includes(typeof params.filterValue) ? `${params.filterValue}` : `'${params.filterValue}'`)
        .replace('$filterOperator', `${params.filterOperator}`)
}
