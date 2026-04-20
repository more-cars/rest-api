import neo4j from "neo4j-driver"
import type {DbNodeType} from "../types/DbNodeType"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {mapDbNodeTypeToNeo4jNodeType} from "./mapDbNodeTypeToNeo4jNodeType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {escapeSingleQuotes} from "./escapeSingleQuotes"

export async function fetchNodeCountByNodeType(nodeType: DbNodeType, params?: CollectionQueryParams) {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    try {
        const records = await session.executeRead(async txc => {
            const result = await runNeo4jQuery(fetchNodeCountByNodeTypeQuery(nodeType, params), txc)
            return result.records
        })

        return records[0].get('nodeCount') as number
    } finally {
        await session.close()
    }
}

export function fetchNodeCountByNodeTypeQuery(nodeType: DbNodeType, params?: CollectionQueryParams) {
    const nodeTypeLabel = getNamespacedNodeTypeLabel(mapDbNodeTypeToNeo4jNodeType(nodeType))

    if (params?.filterByProperty && params?.filterValue) {
        let filterValue = params.filterValue
        if (typeof filterValue === "string") {
            filterValue = `'${escapeSingleQuotes(filterValue)}'`
        } else {
            filterValue = `${filterValue}`
        }

        return getCypherQueryTemplate('nodes/_cypher/getNodeCountByNodeTypeFiltered.cypher')
            .trim()
            .replace(':nodeLabel', `:${nodeTypeLabel}`)
            .replace('$filterByProperty', `${params.filterByProperty}`)
            .replace('$filterValue', filterValue)
            .replace('$filterOperator', `${params.filterOperator}`)
    } else { // the reason for this switch is to take advantage of the better database performance when an unfiltered query is executed
        return getCypherQueryTemplate('nodes/_cypher/getNodeCountByNodeType.cypher')
            .trim()
            .replace(':nodeLabel', `:${nodeTypeLabel}`)
    }
}
