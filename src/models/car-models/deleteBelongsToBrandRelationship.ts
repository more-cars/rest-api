import {deleteSpecificRelationship} from "../../db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"

export async function deleteBelongsToBrandRelationship(carModelId: number, brandId: number) {
    return deleteSpecificRelationship(
        brandId,
        carModelId,
        DbRelationship.CarModelBelongsToBrand,
    )
}
