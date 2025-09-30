import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CompanyHasImageRelationship} from "./types/CompanyHasImageRelationship"
import {CompanyRelationship} from "./types/CompanyRelationship"

export async function createHasImageRelationship(companyId: number, imageId: number): Promise<false | CompanyHasImageRelationship> {
    const baseRelationship = await createRelationship(
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
