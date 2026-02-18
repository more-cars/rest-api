import type {RelType} from "./types/RelType"
import type {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {getRelationship} from "../../db/relationships/getRelationship"
import {getDbRelationshipType} from "./getDbRelationshipType"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

export async function deleteOutgoingRel(
    originId: number,
    relationshipType: RelType,
    destinationType: NodeTypeLabel,
) {
    const dbRelationship = await getRelationship(
        originId,
        getDbRelationshipType(relationshipType),
        destinationType,
    )

    if (dbRelationship) {
        await deleteRelationshipById(dbRelationship.relationship_id)
    }
}
