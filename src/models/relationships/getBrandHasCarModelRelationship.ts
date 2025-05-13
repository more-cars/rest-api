import {BrandNode} from "../../types/BrandNode"
import {CarModelNode} from "../../types/CarModelNode"
import {getRelationship} from "../../db/getRelationship"
import {BrandRelationship} from "../../types/brands/BrandRelationship"
import {BrandHasCarModelRelationship} from "../../types/brands/BrandHasCarModelRelationship"

/**
 * Returns the HAS_CAR_MODEL relationship between the given nodes when it exists.
 */
export async function getBrandHasCarModelRelationship(brand: BrandNode, carModel: CarModelNode) {
    const relation = await getRelationship(
        brand.id as number,
        carModel.id as number,
        BrandRelationship.hasCarModel,
    )

    if (!relation) {
        return false
    }

    const specificRelationship: BrandHasCarModelRelationship = {
        brand_id: brand.id as number,
        car_model_id: carModel.id as number,
        relationship_id: relation.relationship_id,
        relationship_name: BrandRelationship.hasCarModel,
    }

    return specificRelationship
}
