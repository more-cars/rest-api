import {DbRelationship} from "../../db/types/DbRelationship"
import type {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {getRelationship} from "../../db/relationships/getRelationship"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

export async function deleteDeprecatedRel(originId: number, relationshipType: DbRelationship, destinationType: NodeTypeLabel) {
    const relationship = await getRelationship(
        originId,
        relationshipType,
        destinationType,
    )

    if (relationship) {
        await deleteRelationshipById(relationship.relationship_id)
    }
}
