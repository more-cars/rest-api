import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CarModelHasPrimeImageRelationship} from "./types/CarModelHasPrimeImageRelationship"
import {CarModelRelationship} from "./types/CarModelRelationship"
import {getCarModelHasPrimeImageRelationship} from "./getCarModelHasPrimeImageRelationship"

export async function createHasPrimeImageRelationship(carModelId: number, imageId: number): Promise<false | CarModelHasPrimeImageRelationship> {
    const existingRelation = await getCarModelHasPrimeImageRelationship(carModelId, imageId)
    if (existingRelation) {
        return existingRelation
    }

    const baseRelationship = await createRelationship(
        carModelId,
        imageId,
        DbRelationship.CarModelHasPrimeImage,
    )

    if (!baseRelationship) {
        return false
    }

    const specificRelationship: CarModelHasPrimeImageRelationship = {
        car_model_id: carModelId,
        image_id: imageId,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: CarModelRelationship.hasPrimeImage,
        created_at: baseRelationship.created_at,
        updated_at: baseRelationship.updated_at,
    }

    return specificRelationship
}
