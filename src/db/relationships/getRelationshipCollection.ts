import neo4j, {Driver, Node, Relationship} from "neo4j-driver"
import {getDriver} from "../driver"
import {BaseRelationship} from "../types/BaseRelationship"
import {DbRelationship} from "../types/DbRelationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function getRelationshipCollection(nodeId: number, relationshipName: DbRelationship, nodeIsRelationshipTarget = false): Promise<Array<BaseRelationship>> {
    const relationships: Array<BaseRelationship> = []

    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getRelationshipCollectionQuery(nodeId, relationshipName))
        return result.records
    })

    await session.close()
    await driver.close()

    records.forEach(record => {
        const relationship: Relationship = record.get('r')
        const partnerNode: Node = record.get('b')
        relationships.push({
            start_node_id: nodeIsRelationshipTarget ? partnerNode.properties.mc_id : nodeId,
            end_node_id: nodeIsRelationshipTarget ? nodeId : partnerNode.properties.mc_id,
            relationship_id: relationship.properties.mc_id,
            relationship_name: relationshipName,
            created_at: relationship.properties.created_at,
            updated_at: relationship.properties.updated_at,
        })
    })

    return relationships
}

export function getRelationshipCollectionQuery(nodeId: number, relationshipName: DbRelationship) {
    return getCypherQueryTemplate('relationships/_cypher/getRelationshipCollection.cypher')
        .trim()
        .replace('$nodeId', nodeId.toString())
        .replace('relationshipName', relationshipName)
}
