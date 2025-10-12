import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CompanyRelationship} from "./types/CompanyRelationship"
import {CompanyHasBrandRelationship} from "./types/CompanyHasBrandRelationship"

export async function getSpecificHasBrandRelationship(companyId: number, brandId: number) {
    const dbRelationship = await getSpecificRelationship(
        companyId,
        brandId,
        DbRelationship.CompanyHasBrand,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        company_id: companyId,
        brand_id: brandId,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: CompanyRelationship.hasBrand,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    } as CompanyHasBrandRelationship
}
