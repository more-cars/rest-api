import {BrandHasCarModelRelationship} from "../../types/brands/BrandHasCarModelRelationship"

export function marshalRelationship(relationship: BrandHasCarModelRelationship) {
    return <BrandHasCarModelRelationship>{
        brand_id: relationship.brand_id,
        car_model_id: relationship.car_model_id,
        relationship_id: relationship.relationship_id,
        relationship_name: relationship.relationship_name,
    }
}
