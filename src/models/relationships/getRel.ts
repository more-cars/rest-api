import type {RelationshipType} from "./types/RelationshipType"
import type {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {RelDirection} from "./types/RelDirection"
import type {DbRelationship} from "../../db/types/DbRelationship"
import {getDbRelationshipType} from "./getDbRelationshipType"
import {getRelationship} from "../../db/relationships/getRelationship"
import type {GenericRelation} from "./types/GenericRelation"
import {RelationshipDirection} from "../../db/types/RelationshipDirection"

export async function getRel(
    startNodeId: number,
    relationshipType: RelationshipType,
    destinationType: NodeTypeLabel,
    reverse: RelDirection = RelDirection.FORWARD
) {
    const dbRelationshipType: DbRelationship = getDbRelationshipType(relationshipType)

    const dbRelationship = await getRelationship(
        startNodeId,
        dbRelationshipType,
        destinationType,
        reverse ? RelationshipDirection.REVERSE : RelationshipDirection.FORWARD,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        id: dbRelationship.id,
        type: relationshipType,
        origin: dbRelationship.start_node,
        destination: dbRelationship.end_node,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at
    } as GenericRelation
}
