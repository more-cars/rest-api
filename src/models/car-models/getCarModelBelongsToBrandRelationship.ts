import {BrandNode} from "../brands/types/BrandNode"
import {CarModelNode} from "./types/CarModelNode"
import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CarModelBelongsToBrandRelationship} from "./types/CarModelBelongsToBrandRelationship"
import {CarModelRelationship} from "./types/CarModelRelationship"

/**
 * Returns the BELONGS_TO_BRAND relationship between the given nodes when it exists.
 */
export async function getCarModelBelongsToBrandRelationship(carModel: CarModelNode, brand: BrandNode): Promise<false | CarModelBelongsToBrandRelationship> {
    // ⚠️ Outside the database we distinguish between BRAND.HAS_CAR_MODEL and CAR_MODEL.BELONGS_TO_BRAND for better readability.
    // But in the database we have to use the SAME relationship for both directions (HAS_CAR_MODEL and BELONGS_TO_BRAND) to avoid duplicates.
    const relationship = await getSpecificRelationship(
        brand.id as number,
        carModel.id as number,
        DbRelationship.BrandHasCarModel,
    )

    if (!relationship) {
        return false
    }

    const specificRelationship: CarModelBelongsToBrandRelationship = {
        car_model_id: carModel.id as number,
        brand_id: brand.id as number,
        relationship_id: relationship.relationship_id,
        relationship_name: CarModelRelationship.belongsToBrand,
    }

    return specificRelationship
}
