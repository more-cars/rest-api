import neo4j, {type Driver, type Relationship} from "neo4j-driver"
import {getDriver} from "../../driver"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import type {
    ImageBelongsToNodeTypeRelationships
} from "../../../models/images/types/ImageBelongsToNodeTypeRelationships"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import type {ImageBelongsToNodeRelationship} from "../../../models/images/types/ImageBelongsToNodeRelationship"

export async function getBelongsToNodeTypeRelationships(imageId: number): Promise<ImageBelongsToNodeTypeRelationships> {
    return {
        companies: await fetchImageRelationshipsForNodeType(NodeTypeLabel.Company, imageId),
        brands: await fetchImageRelationshipsForNodeType(NodeTypeLabel.Brand, imageId),
        car_models: await fetchImageRelationshipsForNodeType(NodeTypeLabel.CarModel, imageId)
    }
}

export async function fetchImageRelationshipsForNodeType(nodeType: NodeTypeLabel, imageId: number) {
    const relationships: Array<ImageBelongsToNodeRelationship> = []

    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getImageBelongsToNodeTypeRelationshipsQuery(imageId, nodeType))
        return result.records
    })

    await session.close()
    await driver.close()

    records.forEach((record) => {
        const dbRel: Relationship = record.get('r')
        const dbEndNode: Relationship = record.get('b')

        relationships.push(<ImageBelongsToNodeRelationship>{
            image_id: imageId,
            partner_node_id: dbEndNode.properties.mc_id,
            relationship_id: dbRel.properties.mc_id,
            relationship_name: dbRel.type,
            created_at: dbRel.properties.created_at,
            updated_at: dbRel.properties.updated_at,
        })
    })

    return relationships
}

export function getImageBelongsToNodeTypeRelationshipsQuery(imageId: number, nodeType: NodeTypeLabel) {
    return getCypherQueryTemplate('nodes/images/_cypher/getBelongsToNodeTypeRelationships.cypher')
        .trim()
        .replace('$imageId', imageId.toString())
        .replace('targetNodeLabel', nodeType)
}
