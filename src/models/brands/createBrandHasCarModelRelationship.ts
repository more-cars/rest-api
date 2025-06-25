import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"
import {BrandHasCarModelRelationship} from "./types/BrandHasCarModelRelationship"

/**
 * Creates a HAS_CAR_MODEL relationship between the given nodes.
 */
export async function createBrandHasCarModelRelationship(brandId: number, carModelId: number): Promise<false | BrandHasCarModelRelationship> {
    const baseRelationship = await createRelationship(
        brandId,
        carModelId,
        DbRelationship.BrandHasCarModel,
    )

    if (!baseRelationship) {
        return false
    }

    const specificRelationship: BrandHasCarModelRelationship = {
        brand_id: brandId,
        car_model_id: carModelId,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: BrandRelationship.hasCarModel,
        created_at: baseRelationship.created_at,
        updated_at: baseRelationship.updated_at,
    }

    return specificRelationship
}
