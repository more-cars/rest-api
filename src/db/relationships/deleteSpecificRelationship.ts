import neo4j from "neo4j-driver"
import {getDriver} from "../driver"
import {DbRelationship} from "../types/DbRelationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function deleteSpecificRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipName: DbRelationship
): Promise<boolean> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const result = await session.executeWrite(async txc => {
        const result = await txc.run(deleteSpecificRelationshipQuery(startNodeId, relationshipName, endNodeId))
        return result.summary.counters.containsUpdates()
    })

    await session.close()

    return result
}

export function deleteSpecificRelationshipQuery(startNodeId: number, relationshipName: DbRelationship, endNodeId: number) {
    return getCypherQueryTemplate('relationships/_cypher/deleteSpecificRelationship.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)
        .replace('$endNodeId', endNodeId.toString())
}
