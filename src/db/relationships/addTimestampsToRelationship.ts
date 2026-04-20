import neo4j, {Driver, Relationship, Session} from "neo4j-driver"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function addTimestampsToRelationship(elementId: string, createdAt: string, updatedAt: string): Promise<Relationship> {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const dbRel: Relationship = await session.executeWrite(async txc => {
        const result = await runNeo4jQuery(addTimestampsToRelationshipQuery(elementId, createdAt, updatedAt), txc)
        return result.records[0].get('relationship')
    })

    await session.close()

    return dbRel
}

export function addTimestampsToRelationshipQuery(elementId: string, createdAt: string, updatedAt: string) {
    return getCypherQueryTemplate('relationships/_cypher/addTimestampsToRelationship.cypher')
        .trim()
        .replace('$elementId', elementId)
        .replace('$createdAt', createdAt)
        .replace('$updatedAt', updatedAt)
}
