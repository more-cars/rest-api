import {CompanyHasBrandRelationship} from "../../../models/companies/types/CompanyHasBrandRelationship"
import {CompanyHasBrandResponse} from "../types/CompanyHasBrandResponse"
import {dasherize} from "inflection"

export function marshalHasBrandRelationship(relationship: CompanyHasBrandRelationship) {
    return {
        company_id: relationship.company_id,
        brand_id: relationship.brand_id,
        relationship_id: relationship.relationship_id,
        relationship_name: dasherize(relationship.relationship_name.toLowerCase()),
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    } as CompanyHasBrandResponse
}
