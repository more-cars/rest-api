import {BrandNode} from "../../types/brands/BrandNode"
import {CarModelNode} from "../../types/car-models/CarModelNode"
import {createRelationship} from "../../db/createRelationship"
import {BrandRelationship} from "../../types/brands/BrandRelationship"
import {BrandHasCarModelRelationship} from "../../types/brands/BrandHasCarModelRelationship"

/**
 * Creates a HAS_CAR_MODEL relationship between the given nodes.
 */
export async function createBrandHasCarModelRelationship(brand: BrandNode, carModel: CarModelNode) {
    const baseRelationship = await createRelationship(
        brand.id as number,
        carModel.id as number,
        BrandRelationship.hasCarModel,
    )

    if (!baseRelationship) {
        return false
    }

    const specificRelationship: BrandHasCarModelRelationship = {
        brand_id: brand.id as number,
        car_model_id: carModel.id as number,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: BrandRelationship.hasCarModel,
    }

    return specificRelationship
}
