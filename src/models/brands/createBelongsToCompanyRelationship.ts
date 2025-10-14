import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"
import {BrandBelongsToCompanyRelationship} from "./types/BrandBelongsToCompanyRelationship"

export async function createBelongsToCompanyRelationship(brandId: number, companyId: number) {
    const dbRelationship = await createRelationship(
        companyId,
        brandId,
        DbRelationship.BrandBelongsToCompany,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        brand_id: brandId,
        company_id: companyId,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: BrandRelationship.belongsToCompany,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    } as BrandBelongsToCompanyRelationship
}
