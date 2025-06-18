import {Driver, Relationship} from "neo4j-driver"

/**
 * Attaching a More Cars ID to the given relationship.
 *
 * ⚠️
 * The input data is assumed to be valid. It is not validated here.
 * When the given relationship doesn't exist or the More Cars ID is invalid then the db query will crash.
 */
export async function addMoreCarsIdToRelationship(internalRelationshipId: string, moreCarsId: number, driver: Driver): Promise<Relationship> {
    const {records} = await driver.executeQuery(`
        MATCH ()-[rel]-()
        WHERE elementId(rel) = "${internalRelationshipId}"
        SET rel.mc_id = ${moreCarsId}
        RETURN rel
        LIMIT 1
    `)

    return records[0].get('rel')
}
