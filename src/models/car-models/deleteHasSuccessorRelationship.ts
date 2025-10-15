import {deleteSpecificRelationship} from "../../db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"

export async function deleteHasSuccessorRelationship(carModelId: number, partnerId: number) {
    return deleteSpecificRelationship(
        carModelId,
        partnerId,
        DbRelationship.CarModelHasSuccessor,
    )
}
