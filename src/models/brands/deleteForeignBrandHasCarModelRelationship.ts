import {getRelationshipForSpecificNode} from "../../db/relationships/getRelationshipForSpecificNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

/**
 * Checks if there exists a relationship between the given `car model` and a `brand` that is NOT the given one.
 * If so, then that relationship will be deleted.
 * If not, nothing happens.
 */
export async function deleteForeignBrandHasCarModelRelationship(brandId: number, carModelId: number) {
    const relationship = await getRelationshipForSpecificNode(
        carModelId,
        DbRelationship.BrandHasCarModel,
    )

    if (relationship && relationship.start_node_id !== brandId) {
        return await deleteRelationshipById(relationship.relationship_id)
    }

    return false
}
