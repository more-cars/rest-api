import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CarModelRelationship} from "./types/CarModelRelationship"
import {CarModelHasSuccessorRelationship} from "./types/CarModelHasSuccessorRelationship"

export async function getSpecificHasSuccessorRelationship(carModelId: number, partnerId: number) {
    const dbRelationship = await getSpecificRelationship(
        carModelId,
        partnerId,
        DbRelationship.CarModelHasSuccessor,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        car_model_id: carModelId,
        partner_id: partnerId,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: CarModelRelationship.hasSuccessor,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    } as CarModelHasSuccessorRelationship
}
