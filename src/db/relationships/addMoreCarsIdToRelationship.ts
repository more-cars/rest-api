import neo4j, {Driver, Relationship, Session} from "neo4j-driver"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

/**
 * Attaching a More Cars ID to the given relationship.
 *
 * ⚠️
 * The input data is assumed to be valid. It is not validated here.
 * When the given relationship doesn't exist or the More Cars ID is invalid then the db query will crash.
 */
export async function addMoreCarsIdToRelationship(elementId: string, moreCarsId: number): Promise<Relationship> {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const dbRel: Relationship = await session.executeWrite(async txc => {
        const result = await runNeo4jQuery(addMoreCarsIdToRelationshipQuery(elementId, moreCarsId), txc)
        return result.records[0].get('rel')
    })

    await session.close()

    return dbRel
}

export function addMoreCarsIdToRelationshipQuery(elementId: string, moreCarsId: number) {
    return getCypherQueryTemplate('relationships/_cypher/addMoreCarsIdToNode.cypher')
        .trim()
        .replace('$elementId', elementId)
        .replace('$moreCarsId', moreCarsId.toString())
}
