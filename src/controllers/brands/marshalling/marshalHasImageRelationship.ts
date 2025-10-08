import {BrandHasImageRelationship} from "../../../models/brands/types/BrandHasImageRelationship"
import {BrandHasImageResponse} from "../types/BrandHasImageResponse"

export function marshalHasImageRelationship(relationship: BrandHasImageRelationship) {
    return {
        brand_id: relationship.brand_id,
        image_id: relationship.image_id,
        relationship_id: relationship.relationship_id,
        relationship_name: relationship.relationship_name,
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    } as BrandHasImageResponse
}
