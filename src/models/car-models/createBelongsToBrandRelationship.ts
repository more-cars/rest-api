import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CarModelRelationship} from "./types/CarModelRelationship"
import {CarModelBelongsToBrandRelationship} from "./types/CarModelBelongsToBrandRelationship"

export async function createBelongsToBrandRelationship(carModelId: number, brandId: number) {
    const dbRelationship = await createRelationship(
        brandId,
        carModelId,
        DbRelationship.BrandHasCarModel,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        car_model_id: carModelId,
        brand_id: brandId,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: CarModelRelationship.belongsToBrand,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    } as CarModelBelongsToBrandRelationship
}
