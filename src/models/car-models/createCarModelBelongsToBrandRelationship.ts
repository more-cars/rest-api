import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CarModelBelongsToBrandRelationship} from "./types/CarModelBelongsToBrandRelationship"
import {CarModelRelationship} from "./types/CarModelRelationship"
import {deleteExistingCarModelBelongsToBrandRelationship} from "./deleteExistingCarModelBelongsToBrandRelationship"
import {getCarModelBelongsToBrandRelationship} from "./getCarModelBelongsToBrandRelationship"

/**
 * Creates a BELONGS_TO_BRAND relationship between the two given nodes.
 * If that relationship already exists, it will be returned without being recreated.
 * If there exists a relationship with another BRAND then that will be deleted.
 */
export async function createCarModelBelongsToBrandRelationship(carModelId: number, brandId: number) {
    const existingRelation = await getCarModelBelongsToBrandRelationship(carModelId, brandId)
    if (existingRelation) {
        return existingRelation
    }

    await deleteExistingCarModelBelongsToBrandRelationship(carModelId)

    // ⚠️ Outside the database we distinguish between BRAND.HAS_CAR_MODEL and CAR_MODEL.BELONGS_TO_BRAND for better readability.
    // But in the database we have to use the SAME relationship for both directions (HAS_CAR_MODEL and BELONGS_TO_BRAND) to avoid duplicates.
    const baseRelationship = await createRelationship(
        brandId,
        carModelId,
        DbRelationship.BrandHasCarModel,
    )

    if (!baseRelationship) {
        return false
    }

    const specificRelationship: CarModelBelongsToBrandRelationship = {
        car_model_id: carModelId,
        brand_id: brandId,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: CarModelRelationship.belongsToBrand,
        created_at: baseRelationship.created_at,
        updated_at: baseRelationship.updated_at,
    }

    return specificRelationship
}