import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {ImageRelationship} from "./types/ImageRelationship"
import {ImageBelongsToNodeRelationship} from "./types/ImageBelongsToNodeRelationship"

/**
 * Returns the BELONGS_TO_NODE relationship between the given nodes when it exists.
 */
export async function getImageBelongsToNodeRelationship(imageId: number, partnerNodeId: number) {
    const relation = await getSpecificRelationship(
        partnerNodeId,
        imageId,
        DbRelationship.NodeHasImage,
    )

    if (!relation) {
        return false
    }

    const specificRelationship: ImageBelongsToNodeRelationship = {
        image_id: imageId,
        partner_node_id: partnerNodeId,
        relationship_id: relation.relationship_id,
        relationship_name: ImageRelationship.belongsToNode,
        created_at: relation.created_at,
        updated_at: relation.updated_at,
    }

    return specificRelationship
}
