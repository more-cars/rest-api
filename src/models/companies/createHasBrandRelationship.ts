import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CompanyHasBrandRelationship} from "./types/CompanyHasBrandRelationship"
import {CompanyRelationship} from "./types/CompanyRelationship"

export async function createHasBrandRelationship(companyId: number, brandId: number): Promise<false | CompanyHasBrandRelationship> {
    const baseRelationship = await createRelationship(
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
