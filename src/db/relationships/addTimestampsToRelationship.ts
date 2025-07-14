import neo4j, {Driver, Relationship, Session} from "neo4j-driver"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {getDriver} from "../driver.ts"

/**
 * Adds the properties "created_at" and "updated_at" to the given relationship.
 */
export async function addTimestampsToRelationship(elementId: string, createdAt: string, updatedAt: string): Promise<Relationship> {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const dbRel: Relationship = await session.executeWrite(async txc => {
        const result = await txc.run(addTimestampsToRelationshipQuery(elementId, createdAt, updatedAt))
        return result.records[0].get('relationship')
    })

    await session.close()
    await driver.close()

    return dbRel
}

export function addTimestampsToRelationshipQuery(elementId: string, createdAt: string, updatedAt: string) {
    return getCypherQueryTemplate('relationships/_cypher/addTimestampsToRelationship.cypher')
        .trim()
        .replace('$elementId', elementId)
        .replace('$createdAt', createdAt)
        .replace('$updatedAt', updatedAt)
}
