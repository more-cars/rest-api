import {CarModelNode} from "../../types/car-models/CarModelNode"
import {DbRelationship} from "../../types/DbRelationship"
import {deleteRelationship} from "../../db/relationships/deleteRelationship"
import {findRelationships} from "../../db/relationships/findRelationships"

/**
 * Checks if there exists a relationship between the given CAR MODEL and any BRAND.
 * If so, then that relationship will be deleted.
 * If not, nothing happens.
 */
export async function deleteExistingCarModelBelongsToBrandRelationship(carModel: CarModelNode): Promise<void> {
    // Officially, there can only exist ONE relationship between a car model and a brand.
    // But to be on the safe side, we will grab all matching relationships the database can find.
    const relationships = await findRelationships(
        carModel.id as number,
        DbRelationship.BrandHasCarModel,
        true,
    )

    for (const relationship of relationships) {
        await deleteRelationship(relationship.relationship_id)
    }
}
