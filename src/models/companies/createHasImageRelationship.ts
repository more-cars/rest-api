import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CompanyRelationship} from "./types/CompanyRelationship"
import {CompanyHasImageRelationship} from "./types/CompanyHasImageRelationship"

export async function createHasImageRelationship(companyId: number, imageId: number) {
    const dbRelationship = await createRelationship(
        companyId,
        imageId,
        DbRelationship.CompanyHasImage,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        company_id: companyId,
        image_id: imageId,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: CompanyRelationship.hasImage,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    } as CompanyHasImageRelationship
}
