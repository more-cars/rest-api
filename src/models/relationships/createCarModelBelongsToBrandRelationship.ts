import {CarModelNode} from "../../types/CarModelNode"
import {BrandNode} from "../../types/BrandNode"
import {createRelationship} from "../../db/createRelationship"
import {BrandRelationship} from "../../types/brands/BrandRelationship"
import {CarModelBelongsToBrandRelationship} from "../../types/car-models/CarModelBelongsToBrandRelationship"
import {CarModelRelationship} from "../../types/car-models/CarModelRelationship"

/**
 * Creates a BELONGS_TO_BRAND relationship between the given nodes.
 */
export async function createCarModelBelongsToBrandRelationship(carModel: CarModelNode, brand: BrandNode) {
    // ⚠️ Outside the database we distinguish between BRAND.HAS_CAR_MODEL and CAR_MODEL.BELONGS_TO_BRAND for better readability.
    // But in the database we have to use the SAME relationship for both directions (HAS_CAR_MODEL and BELONGS_TO_BRAND) to avoid duplicates.
    const baseRelationship = await createRelationship(
        brand.id as number,
        carModel.id as number,
        BrandRelationship.hasCarModel,
    )

    if (!baseRelationship) {
        return false
    }

    const specificRelationship: CarModelBelongsToBrandRelationship = {
        car_model_id: carModel.id as number,
        brand_id: brand.id as number,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: CarModelRelationship.belongsToBrand,
    }

    return specificRelationship
}