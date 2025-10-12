import {getRelationshipsForSpecificNode} from "../../db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CompanyHasImageRelationship} from "./types/CompanyHasImageRelationship"
import {CompanyRelationship} from "./types/CompanyRelationship"

export async function getAllHasImageRelationships(companyId: number) {
    const dbRelationships = await getRelationshipsForSpecificNode(
        companyId,
        DbRelationship.CompanyHasImage,
    )

    const mappedRelationships: CompanyHasImageRelationship[] = []

    dbRelationships.forEach(dbRelationship => {
        mappedRelationships.push({
            company_id: dbRelationship.start_node_id,
            image_id: dbRelationship.end_node_id,
            relationship_id: dbRelationship.relationship_id,
            relationship_name: CompanyRelationship.hasImage,
            created_at: dbRelationship.created_at,
            updated_at: dbRelationship.updated_at
        } as CompanyHasImageRelationship)
    })

    return mappedRelationships
}
