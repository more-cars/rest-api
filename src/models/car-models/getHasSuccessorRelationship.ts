import {getRelationshipForSpecificNode} from "../../db/relationships/getRelationshipForSpecificNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CarModelRelationship} from "./types/CarModelRelationship"
import {CarModelHasSuccessorRelationship} from "./types/CarModelHasSuccessorRelationship"

export async function getHasSuccessorRelationship(carModelId: number) {
    const dbRelationship = await getRelationshipForSpecificNode(
        carModelId,
        DbRelationship.CarModelHasSuccessor,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        car_model_id: dbRelationship.start_node_id,
        partner_id: dbRelationship.end_node_id,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: CarModelRelationship.hasSuccessor,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at
    } as CarModelHasSuccessorRelationship
}
