import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CarModelHasPrimeImageRelationship} from "./types/CarModelHasPrimeImageRelationship"
import {CarModelRelationship} from "./types/CarModelRelationship"

export async function hasHasPrimeImageRelationship(carModelId: number, imageId: number): Promise<false | CarModelHasPrimeImageRelationship> {
    const dbRelationship = await getSpecificRelationship(
        carModelId,
        imageId,
        DbRelationship.CarModelHasPrimeImage,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        car_model_id: dbRelationship.start_node_id,
        image_id: dbRelationship.end_node_id,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: CarModelRelationship.hasPrimeImage,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at
    } as CarModelHasPrimeImageRelationship
}
