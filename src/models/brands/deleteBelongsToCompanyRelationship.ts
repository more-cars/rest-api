import {deleteSpecificRelationship} from "../../db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"

export async function deleteBelongsToCompanyRelationship(brandId: number, companyId: number) {
    return deleteSpecificRelationship(
        companyId,
        brandId,
        DbRelationship.BrandBelongsToCompany,
    )
}
