import {CarModelBelongsToBrandRelationship} from "../../models/car-models/types/CarModelBelongsToBrandRelationship"
import {CarModelBelongsToBrandResponse} from "./types/CarModelBelongsToBrandResponse"

export function marshalRelationship(relationship: CarModelBelongsToBrandRelationship) {
    const marshalledData: CarModelBelongsToBrandResponse = {
        car_model_id: relationship.car_model_id,
        brand_id: relationship.brand_id,
        relationship_id: relationship.relationship_id,
        relationship_name: relationship.relationship_name,
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    }

    return marshalledData
}
