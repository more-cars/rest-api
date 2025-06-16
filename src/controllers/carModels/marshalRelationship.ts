import {CarModelBelongsToBrandRelationship} from "../../types/car-models/CarModelBelongsToBrandRelationship"

export function marshalRelationship(relationship: CarModelBelongsToBrandRelationship) {
    return <CarModelBelongsToBrandRelationship>{
        car_model_id: relationship.car_model_id,
        brand_id: relationship.brand_id,
        relationship_id: relationship.relationship_id,
        relationship_name: relationship.relationship_name,
    }
}
