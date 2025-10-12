import {deleteSpecificRelationship} from "../../db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"

export async function deleteHasBrandRelationship(companyId: number, brandId: number) {
    return deleteSpecificRelationship(
        companyId,
        brandId,
        DbRelationship.CompanyHasBrand,
    )
}
