import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CompanyRelationship} from "./types/CompanyRelationship"
import {CompanyHasPrimeImageRelationship} from "./types/CompanyHasPrimeImageRelationship"

export async function getSpecificHasPrimeImageRelationship(companyId: number, imageId: number) {
    const dbRelationship = await getSpecificRelationship(
        companyId,
        imageId,
        DbRelationship.CompanyHasPrimeImage,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        company_id: companyId,
        image_id: imageId,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: CompanyRelationship.hasPrimeImage,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    } as CompanyHasPrimeImageRelationship
}
