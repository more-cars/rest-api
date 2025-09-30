import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CompanyRelationship} from "./types/CompanyRelationship"
import {CompanyHasImageRelationship} from "./types/CompanyHasImageRelationship"

export async function getSpecificHasImageRelationship(companyId: number, imageId: number): Promise<false | CompanyHasImageRelationship> {
    const baseRelationship = await getSpecificRelationship(
        companyId,
        imageId,
        DbRelationship.CompanyHasImage,
    )

    if (!baseRelationship) {
        return false
    }

    return {
        company_id: companyId,
        image_id: imageId,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: CompanyRelationship.hasImage,
        created_at: baseRelationship.created_at,
        updated_at: baseRelationship.updated_at,
    } as CompanyHasImageRelationship
}
