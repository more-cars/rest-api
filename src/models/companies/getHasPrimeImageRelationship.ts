import {getRelationshipForSpecificNode} from "../../db/relationships/getRelationshipForSpecificNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CompanyHasPrimeImageRelationship} from "./types/CompanyHasPrimeImageRelationship"
import {CompanyRelationship} from "./types/CompanyRelationship"

export async function getHasPrimeImageRelationship(companyId: number): Promise<false | CompanyHasPrimeImageRelationship> {
    const dbRelationship = await getRelationshipForSpecificNode(
        companyId,
        DbRelationship.CompanyHasPrimeImage,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        company_id: dbRelationship.start_node_id,
        image_id: dbRelationship.end_node_id,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: CompanyRelationship.hasPrimeImage,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at
    } as CompanyHasPrimeImageRelationship
}
