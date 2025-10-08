import {BrandHasImageRelationship} from "../../../models/brands/types/BrandHasImageRelationship"
import {BrandHasImageResponse} from "../types/BrandHasImageResponse"
import {dasherize} from "inflection"

export function marshalHasImageRelationship(relationship: BrandHasImageRelationship) {
    return {
        brand_id: relationship.brand_id,
        image_id: relationship.image_id,
        relationship_id: relationship.relationship_id,
        relationship_name: dasherize(relationship.relationship_name.toLowerCase()),
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    } as BrandHasImageResponse
}
