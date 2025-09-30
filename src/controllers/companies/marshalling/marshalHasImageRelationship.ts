import {CompanyHasImageRelationship} from "../../../models/companies/types/CompanyHasImageRelationship"
import {CompanyHasImageResponse} from "../types/CompanyHasImageResponse"
import {dasherize} from "inflection"

export function marshalHasImageRelationship(relationship: CompanyHasImageRelationship) {
    return {
        company_id: relationship.company_id,
        image_id: relationship.image_id,
        relationship_id: relationship.relationship_id,
        relationship_name: dasherize(relationship.relationship_name.toLowerCase()),
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    } as CompanyHasImageResponse
}
