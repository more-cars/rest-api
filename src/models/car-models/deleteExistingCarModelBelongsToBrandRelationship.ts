import {DbRelationship} from "../../db/types/DbRelationship"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"
import {getRelationshipsForSpecificNode} from "../../db/relationships/getRelationshipsForSpecificNode"

/**
 * Checks if there exists a relationship between the given CAR MODEL and any BRAND.
 * If so, then that relationship will be deleted.
 * If not, nothing happens.
 */
export async function deleteExistingCarModelBelongsToBrandRelationship(carModelId: number): Promise<void> {
    // Officially, there can only exist ONE relationship between a car model and a brand.
    // But to be on the safe side, we will grab all matching relationships the database can find.
    const relationships = await getRelationshipsForSpecificNode(
        carModelId,
        DbRelationship.BrandHasCarModel,
        true,
    )

    for (const relationship of relationships) {
        await deleteRelationshipById(relationship.relationship_id)
    }
}
