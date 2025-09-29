import {getRelationshipsForSpecificNode} from "../../db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CompanyHasBrandRelationship} from "./types/CompanyHasBrandRelationship"
import {CompanyRelationship} from "./types/CompanyRelationship"

export async function getAllHasBrandRelationships(companyId: number): Promise<Array<CompanyHasBrandRelationship>> {
    const dbRelationships = await getRelationshipsForSpecificNode(
        companyId,
        DbRelationship.CompanyHasBrand,
    )

    const mappedRelationships: CompanyHasBrandRelationship[] = []

    dbRelationships.forEach(dbRelationship => {
        mappedRelationships.push({
            company_id: dbRelationship.start_node_id,
            brand_id: dbRelationship.end_node_id,
            relationship_id: dbRelationship.relationship_id,
            relationship_name: CompanyRelationship.hasBrand,
            created_at: dbRelationship.created_at,
            updated_at: dbRelationship.updated_at
        } as CompanyHasBrandRelationship)
    })

    return mappedRelationships
}
