import {DbRelationship} from "../../db/types/DbRelationship"
import {getRelationshipForSpecificNode} from "../../db/relationships/getRelationshipForSpecificNode"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

export async function deleteDeprecatedRelationship(nodeId: number, relationshipType: DbRelationship) {
    const relationship = await getRelationshipForSpecificNode(
        nodeId,
        relationshipType,
    )

    if (relationship) {
        await deleteRelationshipById(relationship.relationship_id)
    }
}
