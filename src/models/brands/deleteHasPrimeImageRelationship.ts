import {deleteSpecificRelationship} from "../../db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"

export async function deleteHasPrimeImageRelationship(brandId: number, imageId: number) {
    return deleteSpecificRelationship(
        brandId,
        imageId,
        DbRelationship.BrandHasPrimeImage,
    )
}
