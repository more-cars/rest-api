import {DbRelationship} from "../../db/types/DbRelationship"
import {getRelationship} from "../../db/relationships/getRelationship"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

export async function deleteDeprecatedRelationship(nodeId: number, relationshipType: DbRelationship) {
    const relationship = await getRelationship(
        nodeId,
        relationshipType,
    )

    if (relationship) {
        await deleteRelationshipById(relationship.relationship_id)
    }
}
