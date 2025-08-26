import {CarModelHasPrimeImageRelationship} from "../../../models/car-models/types/CarModelHasPrimeImageRelationship"
import {CarModelHasPrimeImageResponse} from "../types/CarModelHasPrimeImageResponse"

export function marshalHasPrimeImageRelationship(relationship: CarModelHasPrimeImageRelationship) {
    const marshalledData: CarModelHasPrimeImageResponse = {
        car_model_id: relationship.car_model_id,
        image_id: relationship.image_id,
        relationship_id: relationship.relationship_id,
        relationship_name: relationship.relationship_name,
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    }

    return marshalledData
}
