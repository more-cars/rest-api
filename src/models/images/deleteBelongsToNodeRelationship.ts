import {deleteSpecificRelationship} from "../../db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"

export async function deleteBelongsToNodeRelationship(imageId: number, partnerNodeId: number) {
    return deleteSpecificRelationship(
        partnerNodeId,
        imageId,
        DbRelationship.ImageBelongsToNode,
    )
}
