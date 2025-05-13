import {BrandNode} from "../../types/BrandNode"
import {CarModelNode} from "../../types/CarModelNode"
import {findRelationship} from "../../db/findRelationship"
import {BrandRelationship} from "../../types/brands/BrandRelationship"
import {deleteRelationship} from "../../db/deleteRelationship"

/**
 * Checks if there exists a relationship between the given `car model` and a `brand` that is NOT the given one.
 * If so, then that relationship will be deleted.
 * If not, nothing happens.
 */
export async function deleteForeignCarModelBelongsToBrandRelationship(carModel: CarModelNode, brand: BrandNode) {
    const relationship = await findRelationship(
        carModel.id as number,
        BrandRelationship.hasCarModel,
    )

    if (relationship && relationship.start_node_id !== brand.id) {
        return await deleteRelationship(relationship.relationship_id)
    }

    return false
}
