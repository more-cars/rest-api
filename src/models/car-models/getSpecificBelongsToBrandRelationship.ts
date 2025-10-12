import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CarModelRelationship} from "./types/CarModelRelationship"
import type {CarModelBelongsToBrandRelationship} from "./types/CarModelBelongsToBrandRelationship"

export async function getSpecificBelongsToBrandRelationship(carModelId: number, brandId: number) {
    const dbRelationship = await getSpecificRelationship(
        carModelId,
        brandId,
        DbRelationship.BrandHasCarModel,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        car_model_id: dbRelationship.start_node_id,
        brand_id: dbRelationship.end_node_id,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: CarModelRelationship.belongsToBrand,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at
    } as CarModelBelongsToBrandRelationship
}
