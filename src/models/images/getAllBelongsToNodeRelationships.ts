import {getRelationshipsForSpecificNode} from "../../db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {ImageBelongsToNodeRelationship} from "./types/ImageBelongsToNodeRelationship"
import {ImageRelationship} from "./types/ImageRelationship"

export async function getAllBelongsToNodeRelationships(imageId: number) {
    const dbRelationships = await getRelationshipsForSpecificNode(
        imageId,
        DbRelationship.NodeHasImage,
    )

    const mappedRelationships: ImageBelongsToNodeRelationship[] = []

    dbRelationships.forEach(dbRelationship => {
        mappedRelationships.push({
            image_id: dbRelationship.start_node_id,
            partner_node_id: dbRelationship.end_node_id,
            relationship_id: dbRelationship.relationship_id,
            relationship_name: ImageRelationship.belongsToNode,
            created_at: dbRelationship.created_at,
            updated_at: dbRelationship.updated_at
        } as ImageBelongsToNodeRelationship)
    })

    return mappedRelationships
}
