import neo4j, {type Node} from "neo4j-driver"
import type {DbNodeType} from "../types/DbNodeType"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"
import type {DbNode} from "../types/DbNode"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {getNodeTypeCollectionQuery} from "./getNodeTypeCollectionQuery"
import {convertNeo4jNodeToDbNode} from "./convertNeo4jNodeToDbNode"
import {getDenamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {Neo4jNodeType} from "../types/Neo4jNodeType"

export async function fetchNodesFromDb(nodeType: DbNodeType, params?: CollectionQueryParams): Promise<DbNode[]> {
    const defaultParams = {
        sortByProperty: 'mc_id',
        sortDirection: 'ASC',
        offset: 0,
        limit: 100,
    }
    const mergedParams = Object.assign({}, defaultParams, params)

    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    try {
        const records = await session.executeRead(async txc => {
            const result = await runNeo4jQuery(getNodeTypeCollectionQuery(nodeType, mergedParams), txc)
            return result.records
        })

        const dbNodes: DbNode[] = []

        records.forEach(record => {
            const neo4jNode = record.get('node') as Node
            const dbNode = convertNeo4jNodeToDbNode(neo4jNode, getDenamespacedNodeTypeLabel(neo4jNode.labels[0]) as Neo4jNodeType)

            dbNodes.push(dbNode)
        })

        return dbNodes
    } finally {
        await session.close()
    }
}
