import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {ImageBelongsToNodeRelationship} from "./types/ImageBelongsToNodeRelationship"
import {ImageRelationship} from "./types/ImageRelationship"

export async function createImageBelongsToNodeRelationship(imageId: number, partnerNodeId: number) {
    const baseRelationship = await createRelationship(
        partnerNodeId,
        imageId,
        DbRelationship.NodeHasImage,
    )

    if (!baseRelationship) {
        return false
    }

    const specificRelationship: ImageBelongsToNodeRelationship = {
        image_id: imageId,
        partner_node_id: partnerNodeId,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: ImageRelationship.belongsToNode,
        created_at: baseRelationship.created_at,
        updated_at: baseRelationship.updated_at,
    }

    return specificRelationship
}