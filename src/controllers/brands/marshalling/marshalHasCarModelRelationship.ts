import {BrandHasCarModelRelationship} from "../../../models/brands/types/BrandHasCarModelRelationship"
import {BrandHasCarModelResponse} from "../types/BrandHasCarModelResponse"

export function marshalHasCarModelRelationship(relationship: BrandHasCarModelRelationship) {
    return {
        brand_id: relationship.brand_id,
        car_model_id: relationship.car_model_id,
        relationship_id: relationship.relationship_id,
        relationship_name: relationship.relationship_name,
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    } as BrandHasCarModelResponse
}
