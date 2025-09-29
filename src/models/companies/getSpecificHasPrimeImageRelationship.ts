import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CompanyRelationship} from "./types/CompanyRelationship"
import {CompanyHasPrimeImageRelationship} from "./types/CompanyHasPrimeImageRelationship"

export async function getSpecificHasPrimeImageRelationship(companyId: number, imageId: number): Promise<false | CompanyHasPrimeImageRelationship> {
    const baseRelationship = await getSpecificRelationship(
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
