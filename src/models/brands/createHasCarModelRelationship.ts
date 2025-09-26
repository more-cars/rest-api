import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"
import {BrandHasCarModelRelationship} from "./types/BrandHasCarModelRelationship"

export async function createHasCarModelRelationship(brandId: number, carModelId: number): Promise<false | BrandHasCarModelRelationship> {
    const baseRelationship = await createRelationship(
        brandId,
        carModelId,
        DbRelationship.BrandHasCarModel,
    )

    if (!baseRelationship) {
        return false
    }

    return {
        brand_id: brandId,
        car_model_id: carModelId,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: BrandRelationship.hasCarModel,
        created_at: baseRelationship.created_at,
        updated_at: baseRelationship.updated_at,
    } as BrandHasCarModelRelationship
}
