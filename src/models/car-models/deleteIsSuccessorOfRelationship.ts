import {deleteSpecificRelationship} from "../../db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"

export async function deleteIsSuccessorOfRelationship(carModelId: number, partnerId: number) {
    return deleteSpecificRelationship(
        partnerId,
        carModelId,
        DbRelationship.CarModelIsSuccessorOf,
    )
}
