import {BrandNode} from "../../db/nodes/brands/types/BrandNode"
import {CarModelNode} from "../../types/car-models/CarModelNode"
import {getRelationshipForSpecificNode} from "../../db/relationships/getRelationshipForSpecificNode"
import {DbRelationship} from "../../types/DbRelationship"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

/**
 * Checks if there exists a relationship between the given `car model` and a `brand` that is NOT the given one.
 * If so, then that relationship will be deleted.
 * If not, nothing happens.
 */
export async function deleteForeignBrandHasCarModelRelationship(brand: BrandNode, carModel: CarModelNode) {
    const relationship = await getRelationshipForSpecificNode(
        carModel.id as number,
        DbRelationship.BrandHasCarModel,
    )

    if (relationship && relationship.start_node_id !== brand.id) {
        return await deleteRelationshipById(relationship.relationship_id)
    }

    return false
}
