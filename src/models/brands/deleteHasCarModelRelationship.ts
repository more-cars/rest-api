import {deleteSpecificRelationship} from "../../db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"

export async function deleteHasCarModelRelationship(brandId: number, carModelId: number) {
    return deleteSpecificRelationship(
        brandId,
        carModelId,
        DbRelationship.BrandHasCarModel,
    )
}
