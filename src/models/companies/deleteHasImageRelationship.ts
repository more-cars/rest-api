import {deleteSpecificRelationship} from "../../db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"

export async function deleteHasImageRelationship(companyId: number, imageId: number): Promise<boolean> {
    return await deleteSpecificRelationship(
        companyId,
        imageId,
        DbRelationship.CompanyHasImage,
    )
}
