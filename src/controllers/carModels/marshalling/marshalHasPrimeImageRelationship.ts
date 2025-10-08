import {CarModelHasPrimeImageRelationship} from "../../../models/car-models/types/CarModelHasPrimeImageRelationship"
import {CarModelHasPrimeImageResponse} from "../types/CarModelHasPrimeImageResponse"
import {dasherize} from "inflection"

export function marshalHasPrimeImageRelationship(relationship: CarModelHasPrimeImageRelationship) {
    return {
        car_model_id: relationship.car_model_id,
        image_id: relationship.image_id,
        relationship_id: relationship.relationship_id,
        relationship_name: dasherize(relationship.relationship_name.toLowerCase()),
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    } as CarModelHasPrimeImageResponse
}
