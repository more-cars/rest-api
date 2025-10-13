import {deleteSpecificRelationship} from "../../db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"

export async function deleteHasImageRelationship(carModelId: number, imageId: number) {
    return deleteSpecificRelationship(
        carModelId,
        imageId,
        DbRelationship.CarModelHasImage,
    )
}
