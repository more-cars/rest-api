import neo4j, {Relationship} from "neo4j-driver"
import {getDriver} from "../driver"
import {BaseRelationship} from "../types/BaseRelationship"
import {DbRelationship} from "../types/DbRelationship"
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
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getSpecificRelationshipQuery(startNodeId, relationshipName, endNodeId))
        return result.records
    })

    if (records.length === 0) {
        return false
    }

    await session.close()

    const fetchedDbRel: Relationship = records[0].get('r')

    const relationship: BaseRelationship = {
        start_node_id: startNodeId,
        end_node_id: endNodeId,
        relationship_id: fetchedDbRel.properties.mc_id,
        relationship_name: relationshipName,
        created_at: fetchedDbRel.properties.created_at,
        updated_at: fetchedDbRel.properties.updated_at,
    }

    return relationship
}

export function getSpecificRelationshipQuery(startNodeId: number, relationshipName: DbRelationship, endNodeId: number) {
    return getCypherQueryTemplate('relationships/_cypher/getSpecificRelationship.cypher')
        .trim()
        .replace('$startNodeId', startNodeId.toString())
        .replace('relationshipName', relationshipName)
        .replace('$endNodeId', endNodeId.toString())
}
