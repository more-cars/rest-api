import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {ImageRelationship} from "./types/ImageRelationship"
import {ImageBelongsToNodeRelationship} from "./types/ImageBelongsToNodeRelationship"

export async function createBelongsToNodeRelationship(imageId: number, partnerNodeId: number) {
    const dbRelationship = await createRelationship(
        partnerNodeId,
        imageId,
        DbRelationship.ImageBelongsToNode,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        image_id: imageId,
        partner_node_id: partnerNodeId,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: ImageRelationship.belongsToNode,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    } as ImageBelongsToNodeRelationship
}
