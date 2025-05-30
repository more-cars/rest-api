import {getRelationship} from "../../db/getRelationship"
import {DbRelationship} from "../../types/DbRelationship"
import {ImageNode} from "../../types/images/ImageNode"
import {BaseNode} from "../../types/BaseNode"
import {ImageRelationship} from "../../types/images/ImageRelationship"
import {ImageBelongsToNodeRelationship} from "../../types/images/ImageBelongsToNodeRelationship"

/**
 * Returns the BELONGS_TO_NODE relationship between the given nodes when it exists.
 */
export async function getImageBelongsToNodeRelationship(image: ImageNode, partnerNode: BaseNode) {
    const relation = await getRelationship(
        image.id as number,
        partnerNode.id as number,
        DbRelationship.ImageBelongsToNode,
    )

    if (!relation) {
        return false
    }

    const specificRelationship: ImageBelongsToNodeRelationship = {
        image_id: image.id as number,
        partner_node_id: partnerNode.id as number,
        relationship_id: relation.relationship_id,
        relationship_name: ImageRelationship.belongsToNode,
    }

    return specificRelationship
}
