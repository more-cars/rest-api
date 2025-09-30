import {deleteSpecificRelationship} from "../../db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"

export async function deleteHasBrandRelationship(companyId: number, brandId: number): Promise<boolean> {
    return await deleteSpecificRelationship(
        companyId,
        brandId,
        DbRelationship.CompanyHasBrand,
    )
}
