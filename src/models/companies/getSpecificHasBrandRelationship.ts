import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CompanyRelationship} from "./types/CompanyRelationship"
import {CompanyHasBrandRelationship} from "./types/CompanyHasBrandRelationship"

export async function getSpecificHasBrandRelationship(companyId: number, brandId: number): Promise<false | CompanyHasBrandRelationship> {
    const baseRelationship = await getSpecificRelationship(
        companyId,
        brandId,
        DbRelationship.CompanyHasBrand,
    )

    if (!baseRelationship) {
        return false
    }

    return {
        company_id: companyId,
        brand_id: brandId,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: CompanyRelationship.hasBrand,
        created_at: baseRelationship.created_at,
        updated_at: baseRelationship.updated_at,
    } as CompanyHasBrandRelationship
}
