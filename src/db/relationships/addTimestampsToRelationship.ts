import {Relationship, Session} from "neo4j-driver"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

/**
 * Adds the properties "created_at" and "updated_at" to the given relationship.
 */
export async function addTimestampsToRelationship(elementId: string, timestamp: string, session: Session): Promise<Relationship> {
    const records = await session.executeWrite(async txc => {
        const result = await txc.run(addTimestampsToRelationshipQuery(elementId, timestamp, timestamp))
        return result.records
    })

    return records[0].get('relationship')
}

export function addTimestampsToRelationshipQuery(elementId: string, createdAt: string, updatedAt: string) {
    return getCypherQueryTemplate('relationships/_cypher/addTimestampsToRelationship.cypher')
        .trim()
        .replace('$elementId', elementId)
        .replace('$createdAt', createdAt)
        .replace('$updatedAt', updatedAt)
}
