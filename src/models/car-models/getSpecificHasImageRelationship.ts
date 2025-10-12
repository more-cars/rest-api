import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CarModelRelationship} from "./types/CarModelRelationship"
import type {CarModelHasImageRelationship} from "./types/CarModelHasImageRelationship"

export async function getSpecificHasImageRelationship(carModelId: number, imageId: number) {
    const dbRelationship = await getSpecificRelationship(
        carModelId,
        imageId,
        DbRelationship.NodeHasImage,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        car_model_id: carModelId,
        image_id: imageId,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: CarModelRelationship.hasImage,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    } as CarModelHasImageRelationship
}
