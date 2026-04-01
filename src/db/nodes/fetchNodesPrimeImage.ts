import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {getDriver} from "../driver"
import {convertNeo4jNodeToDbNode} from "./convertNeo4jNodeToDbNode"
import {getDenamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {Neo4jNodeType} from "../types/Neo4jNodeType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import type {DbNode} from "../types/DbNode"
import {ImageNode} from "../node-types/images/types/ImageNode"

export async function fetchNodesPrimeImage(ids: number[]) {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(fetchNodesPrimeImageQuery(ids))
        return result.records
    })

    await session.close()

    const nodes: DbNode[] = []

    records.forEach(record => {
        const dbNode = record.get('b') as Node
        const label = getDenamespacedNodeTypeLabel(dbNode.labels[0]) as Neo4jNodeType
        const dataNode = convertNeo4jNodeToDbNode(dbNode, label) as unknown as ImageNode
        nodes.push(dataNode)
    })

    return nodes
}

export function fetchNodesPrimeImageQuery(ids: number[]) {
    return getCypherQueryTemplate('nodes/_cypher/getNodesPrimeImage.cypher')
        .trim()
        .replace('$nodeIds', ids.join(','))
}
