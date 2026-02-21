import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {getDriver} from "../driver"
import {convertNeo4jNodeToDbNode} from "./convertNeo4jNodeToDbNode"
import {getDenamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {Neo4jNodeType} from "../types/Neo4jNodeType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function fetchNodeById(id: number) {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(fetchNodeByIdQuery(id))
        return result.records
    })

    await session.close()

    if (records.length === 0) {
        return false
    }

    const node: Node = records[0].get('node')

    return convertNeo4jNodeToDbNode(node, getDenamespacedNodeTypeLabel(node.labels[0]) as Neo4jNodeType)
}

export function fetchNodeByIdQuery(id: number) {
    return getCypherQueryTemplate('nodes/_cypher/getNodeById.cypher')
        .trim()
        .replace('$id', id.toString())
}
