import neo4j from "neo4j-driver"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function deleteNode(id: number): Promise<boolean> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    try {
        return await session.executeWrite(async txc => {
            const result = await runNeo4jQuery(deleteNodeQuery(id), txc)
            return result.summary.counters.containsUpdates()
        })
    } finally {
        await session.close()
    }
}

export function deleteNodeQuery(id: number) {
    return getCypherQueryTemplate('nodes/_cypher/deleteNode.cypher')
        .trim()
        .replace('$id', id.toString())
}
