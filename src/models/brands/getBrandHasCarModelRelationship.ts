import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"
import {BrandHasCarModelRelationship} from "./types/BrandHasCarModelRelationship"

/**
 * Returns the HAS_CAR_MODEL relationship between the given nodes when it exists.
 */
export async function getBrandHasCarModelRelationship(brandId: number, carModelId: number): Promise<false | BrandHasCarModelRelationship> {
    const relationship = await getSpecificRelationship(
        brandId as number,
        carModelId as number,
        DbRelationship.BrandHasCarModel,
    )

    if (!relationship) {
        return false
    }

    const specificRelationship: BrandHasCarModelRelationship = {
        brand_id: brandId,
        car_model_id: carModelId,
        relationship_id: relationship.relationship_id,
        relationship_name: BrandRelationship.hasCarModel,
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    }

    return specificRelationship
}
