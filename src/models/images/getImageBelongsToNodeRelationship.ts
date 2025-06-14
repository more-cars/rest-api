import {getRelationship} from "../../db/getRelationship"
import {DbRelationship} from "../../types/DbRelationship"
import {ImageRelationship} from "../../types/images/ImageRelationship"
import {ImageBelongsToNodeRelationship} from "../../types/images/ImageBelongsToNodeRelationship"

/**
 * Returns the BELONGS_TO_NODE relationship between the given nodes when it exists.
 */
export async function getImageBelongsToNodeRelationship(imageId: number, partnerNodeId: number) {
    const relation = await getRelationship(
        imageId,
        partnerNodeId,
        DbRelationship.ImageBelongsToNode,
    )

    if (!relation) {
        return false
    }

    const specificRelationship: ImageBelongsToNodeRelationship = {
        image_id: imageId,
        partner_node_id: partnerNodeId,
        relationship_id: relation.relationship_id,
        relationship_name: ImageRelationship.belongsToNode,
    }

    return specificRelationship
}
