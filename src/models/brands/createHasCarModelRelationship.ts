import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"
import {BrandHasCarModelRelationship} from "./types/BrandHasCarModelRelationship"

export async function createHasCarModelRelationship(brandId: number, carModelId: number) {
    const dbRelationship = await createRelationship(
        brandId,
        carModelId,
        DbRelationship.BrandHasCarModel,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        brand_id: brandId,
        car_model_id: carModelId,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: BrandRelationship.hasCarModel,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    } as BrandHasCarModelRelationship
}
