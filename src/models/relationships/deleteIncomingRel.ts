import type {RelType} from "./types/RelType"
import type {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {getDbRelationshipType} from "./getDbRelationshipType"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"
import {getRelationshipByEndNode} from "../../db/relationships/getRelationshipByEndNode"

export async function deleteIncomingRel(
    destinationId: number,
    relationshipType: RelType,
    originType: NodeTypeLabel,
) {
    const dbRelationship = await getRelationshipByEndNode(
        destinationId,
        getDbRelationshipType(relationshipType),
        originType,
    )

    if (dbRelationship) {
        await deleteRelationshipById(dbRelationship.relationship_id)
    }
}
