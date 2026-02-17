import type {RelationshipType} from "./types/RelationshipType"
import type {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {getRelationship} from "../../db/relationships/getRelationship"
import {getDbRelationshipType} from "./getDbRelationshipType"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

export async function deleteOutgoingRel(
    originId: number,
    relationshipType: RelationshipType,
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
