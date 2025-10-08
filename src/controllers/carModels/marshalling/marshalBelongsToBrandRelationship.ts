import {CarModelBelongsToBrandRelationship} from "../../../models/car-models/types/CarModelBelongsToBrandRelationship"
import {CarModelBelongsToBrandResponse} from "../types/CarModelBelongsToBrandResponse"
import {dasherize} from "inflection"

export function marshalBelongsToBrandRelationship(relationship: CarModelBelongsToBrandRelationship) {
    return {
        car_model_id: relationship.car_model_id,
        brand_id: relationship.brand_id,
        relationship_id: relationship.relationship_id,
        relationship_name: dasherize(relationship.relationship_name.toLowerCase()),
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    } as CarModelBelongsToBrandResponse
}
