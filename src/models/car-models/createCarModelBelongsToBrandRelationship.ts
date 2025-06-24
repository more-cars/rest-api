import {CarModelNode} from "./types/CarModelNode"
import {BrandNode} from "../brands/types/BrandNode"
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
export async function createCarModelBelongsToBrandRelationship(carModel: CarModelNode, brand: BrandNode) {
    const existingRelation = await getCarModelBelongsToBrandRelationship(carModel, brand)
    if (existingRelation) {
        return existingRelation
    }

    await deleteExistingCarModelBelongsToBrandRelationship(carModel)

    // ⚠️ Outside the database we distinguish between BRAND.HAS_CAR_MODEL and CAR_MODEL.BELONGS_TO_BRAND for better readability.
    // But in the database we have to use the SAME relationship for both directions (HAS_CAR_MODEL and BELONGS_TO_BRAND) to avoid duplicates.
    const baseRelationship = await createRelationship(
        brand.id as number,
        carModel.id as number,
        DbRelationship.BrandHasCarModel,
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