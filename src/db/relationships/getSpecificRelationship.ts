import {Driver, Relationship, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver"
import {BaseRelationship} from "../../types/BaseRelationship"
import {DbRelationship} from "../../types/DbRelationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

/**
 * Fetching the relationship between the two given nodes, which matches the provided relationship name.
 * If there exists none then false is returned.
 */
export async function getSpecificRelationship(
    startNodeId: number,
    endNodeId: number,
    relationshipName: DbRelationship
): Promise<false | BaseRelationship> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const relationship = await getRel(startNodeId, endNodeId, relationshipName, driver)

    await session.close()
    await closeDriver(driver)

    return relationship
}

async function getRel(
    startNodeId: number,
    endNodeId: number,
    relationshipName: DbRelationship,
    driver: Driver
): Promise<false | BaseRelationship> {
    const {records} = await driver.executeQuery(getSpecificRelationshipQuery(startNodeId, relationshipName, endNodeId))

    if (records.length === 0) {
        return false
    }

    const fetchedDbRel: Relationship = records[0].get('r')

    return <BaseRelationship>{
        start_node_id: startNodeId,
        end_node_id: endNodeId,
        relationship_id: fetchedDbRel.properties.mc_id,
        relationship_name: relationshipName,
    }
}

export function getSpecificRelationshipQuery(startNodeId: number, relationshipName: DbRelationship, endNodeId: number) {
    return getCypherQueryTemplate('relationships/_cypher/getSpecificRelationship.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)
        .replace('$endNodeId', endNodeId.toString())
}
