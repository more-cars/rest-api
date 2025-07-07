import {Relationship, Session} from "neo4j-driver"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

/**
 * Attaching a More Cars ID to the given relationship.
 *
 * ⚠️
 * The input data is assumed to be valid. It is not validated here.
 * When the given relationship doesn't exist or the More Cars ID is invalid then the db query will crash.
 */
export async function addMoreCarsIdToRelationship(elementId: string, moreCarsId: number, session: Session): Promise<Relationship> {
    const records = await session.executeWrite(async txc => {
        const result = await txc.run(addMoreCarsIdToRelationshipQuery(elementId, moreCarsId))
        return result.records
    })

    return records[0].get('rel')
}

export function addMoreCarsIdToRelationshipQuery(elementId: string, moreCarsId: number) {
    return getCypherQueryTemplate('relationships/_cypher/addMoreCarsIdToNode.cypher')
        .trim()
        .replace('$elementId', elementId)
        .replace('$moreCarsId', moreCarsId.toString())
}
