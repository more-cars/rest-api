import type {CarModelHasPrimeImageRelationship} from "./types/CarModelHasPrimeImageRelationship"
import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CarModelRelationship} from "./types/CarModelRelationship"

export async function getCarModelHasPrimeImageRelationship(carModelId: number, imageId: number): Promise<false | CarModelHasPrimeImageRelationship> {
    const relationship = await getSpecificRelationship(
        carModelId,
        imageId,
        DbRelationship.CarModelHasPrimeImage,
    )

    if (!relationship) {
        return false
    }

    const specificRelationship: CarModelHasPrimeImageRelationship = {
        car_model_id: carModelId,
        image_id: imageId,
        relationship_id: relationship.relationship_id,
        relationship_name: CarModelRelationship.hasPrimeImage,
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    }

    return specificRelationship
}
