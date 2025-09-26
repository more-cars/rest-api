import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"
import {BrandHasCarModelRelationship} from "./types/BrandHasCarModelRelationship"

export async function getHasCarModelRelationship(brandId: number, carModelId: number): Promise<false | BrandHasCarModelRelationship> {
    const relationship = await getSpecificRelationship(
        brandId,
        carModelId,
        DbRelationship.BrandHasCarModel,
    )

    if (!relationship) {
        return false
    }

    return {
        brand_id: brandId,
        car_model_id: carModelId,
        relationship_id: relationship.relationship_id,
        relationship_name: BrandRelationship.hasCarModel,
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    } as BrandHasCarModelRelationship
}
