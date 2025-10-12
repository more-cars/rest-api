import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {ImageRelationship} from "./types/ImageRelationship"
import {ImageBelongsToNodeRelationship} from "./types/ImageBelongsToNodeRelationship"

export async function getSpecificBelongsToNodeRelationship(imageId: number, partnerNodeId: number) {
    const dbRelationship = await getSpecificRelationship(
        partnerNodeId,
        imageId,
        DbRelationship.NodeHasImage,
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
