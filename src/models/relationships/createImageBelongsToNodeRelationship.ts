import {createRelationship} from "../../db/createRelationship"
import {DbRelationship} from "../../types/DbRelationship"
import {ImageNode} from "../../types/images/ImageNode"
import {BaseNode} from "../../types/BaseNode"
import {ImageBelongsToNodeRelationship} from "../../types/images/ImageBelongsToNodeRelationship"
import {ImageRelationship} from "../../types/images/ImageRelationship"

/**
 * Creates a BELONGS_TO_NODE relationship between the given nodes.
 */
export async function createImageBelongsToNodeRelationship(image: ImageNode, partnerNode: BaseNode) {
    const baseRelationship = await createRelationship(
        image.id as number,
        partnerNode.id as number,
        DbRelationship.ImageBelongsToNode,
    )

    if (!baseRelationship) {
        return false
    }

    const specificRelationship: ImageBelongsToNodeRelationship = {
        image_id: image.id as number,
        partner_node_id: partnerNode.id as number,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: ImageRelationship.belongsToNode,
    }

    return specificRelationship
}