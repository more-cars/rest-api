import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../types/DbRelationship"
import {ImageBelongsToNodeRelationship} from "../../types/images/ImageBelongsToNodeRelationship"
import {ImageRelationship} from "../../types/images/ImageRelationship"

/**
 * Creates a BELONGS_TO_NODE relationship between the given nodes.
 */
export async function createImageBelongsToNodeRelationship(imageId: number, partnerNodeId: number) {
    const baseRelationship = await createRelationship(
        imageId,
        partnerNodeId,
        DbRelationship.ImageBelongsToNode,
    )

    if (!baseRelationship) {
        return false
    }

    const specificRelationship: ImageBelongsToNodeRelationship = {
        image_id: imageId,
        partner_node_id: partnerNodeId,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: ImageRelationship.belongsToNode,
    }

    return specificRelationship
}