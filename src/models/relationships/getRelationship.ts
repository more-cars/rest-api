import type {RelationshipType} from "./types/RelationshipType"
import type {DbRelationship} from "../../db/types/DbRelationship"
import {getDbRelationshipType} from "./getDbRelationshipType"
import {getRelationshipForSpecificNode} from "../../db/relationships/getRelationshipForSpecificNode"
import type {GenericRelation} from "./types/GenericRelation"

export async function getRelationship(nodeId: number, relationshipType: RelationshipType) {
    const dbRelationshipType: DbRelationship = getDbRelationshipType(relationshipType)

    const dbRelationship = await getRelationshipForSpecificNode(
        nodeId,
        dbRelationshipType,
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
