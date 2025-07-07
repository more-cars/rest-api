import neo4j, {Driver, Relationship} from "neo4j-driver"
import {getDriver} from "../../driver"
import {ImageBelongsToNodeRelationship} from "../../../models/images/types/ImageBelongsToNodeRelationship"
import {DbRelationship} from "../../types/DbRelationship"
import {getRelationshipsForSpecificNodeQuery} from "../../relationships/getRelationshipsForSpecificNode"

export async function getRelationships(startNodeId: number): Promise<Array<ImageBelongsToNodeRelationship>> {
    const relationships: ImageBelongsToNodeRelationship[] = []

    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getRelationshipsForSpecificNodeQuery(startNodeId, DbRelationship.ImageBelongsToNode))
        return result.records
    })

    await session.close()
    await driver.close()

    records.forEach((record) => {
        const dbRel: Relationship = record.get('r')
        const dbEndNode: Relationship = record.get('b')

        relationships.push(<ImageBelongsToNodeRelationship>{
            image_id: startNodeId,
            partner_node_id: dbEndNode.properties.mc_id,
            relationship_id: dbRel.properties.mc_id,
            relationship_name: dbRel.type,
            created_at: dbRel.properties.created_at,
            updated_at: dbRel.properties.updated_at,
        })
    })

    return relationships
}
