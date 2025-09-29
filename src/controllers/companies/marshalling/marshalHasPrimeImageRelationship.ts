import {CompanyHasPrimeImageRelationship} from "../../../models/companies/types/CompanyHasPrimeImageRelationship"
import {CompanyHasPrimeImageResponse} from "../types/CompanyHasPrimeImageResponse"
import {dasherize} from "inflection"

export function marshalHasPrimeImageRelationship(relationship: CompanyHasPrimeImageRelationship) {
    return {
        company_id: relationship.company_id,
        image_id: relationship.image_id,
        relationship_id: relationship.relationship_id,
        relationship_name: dasherize(relationship.relationship_name.toLowerCase()),
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    } as CompanyHasPrimeImageResponse
}
