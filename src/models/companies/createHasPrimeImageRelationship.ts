import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CompanyHasPrimeImageRelationship} from "./types/CompanyHasPrimeImageRelationship"
import {CompanyRelationship} from "./types/CompanyRelationship"

export async function createHasPrimeImageRelationship(companyId: number, imageId: number): Promise<false | CompanyHasPrimeImageRelationship> {
    const baseRelationship = await createRelationship(
        companyId,
        imageId,
        DbRelationship.CompanyHasPrimeImage,
    )

    if (!baseRelationship) {
        return false
    }

    return {
        company_id: companyId,
        image_id: imageId,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: CompanyRelationship.hasPrimeImage,
        created_at: baseRelationship.created_at,
        updated_at: baseRelationship.updated_at,
    } as CompanyHasPrimeImageRelationship
}
