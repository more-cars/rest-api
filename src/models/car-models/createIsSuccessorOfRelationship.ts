import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CarModelRelationship} from "./types/CarModelRelationship"
import {CarModelIsSuccessorOfRelationship} from "./types/CarModelIsSuccessorOfRelationship"

export async function createIsSuccessorOfRelationship(carModelId: number, partnerId: number) {
    const dbRelationship = await createRelationship(
        partnerId,
        carModelId,
        DbRelationship.CarModelIsSuccessorOf,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        car_model_id: carModelId,
        partner_id: partnerId,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: CarModelRelationship.isSuccessorOf,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    } as CarModelIsSuccessorOfRelationship
}
