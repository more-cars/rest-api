import {Driver, Node, Relationship, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "./driver"
import {BaseRelationship} from "../types/BaseRelationship"
import {DbRelationship} from "../types/DbRelationship"

export async function findRelationships(nodeId: number, relationshipName: DbRelationship, nodeIsRelationshipTarget = false): Promise<Array<BaseRelationship>> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const relationships = await getRels(nodeId, relationshipName, nodeIsRelationshipTarget, driver)

    await session.close()
    await closeDriver(driver)

    return relationships
}

async function getRels(nodeId: number, relationshipName: DbRelationship, nodeIsRelationshipTarget = false, driver: Driver): Promise<Array<BaseRelationship>> {
    const relationships: Array<BaseRelationship> = []

    const {records} = await driver.executeQuery(`
        MATCH (a {mc_id: ${nodeId}})-[r:${relationshipName}]-(b)
        RETURN r, b`,
    )

    records.forEach(record => {
        const relationship: Relationship = record.get('r')
        const partnerNode: Node = record.get('b')
        relationships.push({
            start_node_id: nodeIsRelationshipTarget ? partnerNode.properties.mc_id : nodeId,
            end_node_id: nodeIsRelationshipTarget ? nodeId : partnerNode.properties.mc_id,
            relationship_id: relationship.properties.mc_id,
            relationship_name: relationshipName,
        })
    })

    return relationships
}
