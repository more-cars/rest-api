import {getRelationshipForSpecificNode} from "../../db/relationships/getRelationshipForSpecificNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

export async function deleteForeignHasCarModelRelationship(carModelId: number) {
    const relationship = await getRelationshipForSpecificNode(
        carModelId,
        DbRelationship.BrandHasCarModel,
    )

    if (relationship) {
        await deleteRelationshipById(relationship.relationship_id)
    }
}
