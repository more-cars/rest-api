import {getRelationshipForSpecificNode} from "../../db/relationships/getRelationshipForSpecificNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"
import {BrandBelongsToCompanyRelationship} from "./types/BrandBelongsToCompanyRelationship"

export async function getBelongsToCompanyRelationship(brandId: number) {
    const dbRelationship = await getRelationshipForSpecificNode(
        brandId,
        DbRelationship.BrandBelongsToCompany,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        brand_id: dbRelationship.start_node_id,
        company_id: dbRelationship.end_node_id,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: BrandRelationship.belongsToCompany,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at
    } as BrandBelongsToCompanyRelationship
}
