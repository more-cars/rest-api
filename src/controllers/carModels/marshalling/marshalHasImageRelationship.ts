import {CarModelHasImageRelationship} from "../../../models/car-models/types/CarModelHasImageRelationship"
import {CarModelHasImageResponse} from "../types/CarModelHasImageResponse"
import {dasherize} from "inflection"

export function marshalHasImageRelationship(relationship: CarModelHasImageRelationship) {
    return {
        car_model_id: relationship.car_model_id,
        image_id: relationship.image_id,
        relationship_id: relationship.relationship_id,
        relationship_name: dasherize(relationship.relationship_name.toLowerCase()),
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    } as CarModelHasImageResponse
}
