import {DbRelationship} from "../../db/types/DbRelationship"
import {getRelationship} from "../../db/relationships/getRelationship"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"
import type {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {RelationshipDirection} from "../../db/types/RelationshipDirection"

export async function deleteDeprecatedRel(originId: number, relationshipType: DbRelationship, destinationType: NodeTypeLabel) {
    const relationship = await getRelationship(
        originId,
        relationshipType,
        destinationType,
        RelationshipDirection.FORWARD
    )

    if (relationship) {
        await deleteRelationshipById(relationship.relationship_id)
    }
}
