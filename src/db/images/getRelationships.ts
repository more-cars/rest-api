import {Driver, Relationship, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver"
import {ImageBelongsToNodeRelationship} from "../../types/images/ImageBelongsToNodeRelationship"
import {DbRelationship} from "../../types/DbRelationship"

export async function getRelationships(startNodeId: number): Promise<Array<ImageBelongsToNodeRelationship>> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const relationships = await getRels(startNodeId, driver)

    await session.close()
    await closeDriver(driver)

    return relationships
}

async function getRels(imageId: number, driver: Driver): Promise<Array<ImageBelongsToNodeRelationship>> {
    const relationships: ImageBelongsToNodeRelationship[] = []

    const {records} = await driver.executeQuery(`
        MATCH (a:Image {mc_id: ${imageId}})-[r:${DbRelationship.ImageBelongsToNode}]->(b)
        RETURN a, r, b`
    )

    records.forEach((record) => {
        const dbRel: Relationship = record.get('r')
        const dbStartNode: Relationship = record.get('a')
        const dbEndNode: Relationship = record.get('b')

        relationships.push(<ImageBelongsToNodeRelationship>{
            image_id: dbStartNode.properties.mc_id,
            partner_node_id: dbEndNode.properties.mc_id,
            relationship_id: dbRel.properties.mc_id,
            relationship_name: dbRel.type,
        })
    })

    return relationships
}
