import {DbRelationship} from "../../db/types/DbRelationship"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"
import {getRelationshipsForSpecificNode} from "../../db/relationships/getRelationshipsForSpecificNode"

export async function deleteExistingHasPrimeImageRelationship(carModelId: number): Promise<void> {
    const relationships = await getRelationshipsForSpecificNode(
        carModelId,
        DbRelationship.CarModelHasPrimeImage,
    )

    for (const relationship of relationships) {
        await deleteRelationshipById(relationship.relationship_id)
    }
}
