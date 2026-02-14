import type {RelationshipType} from "./types/RelationshipType"
import {getRelComposition} from "./getRelComposition"
import type {DbRelationship} from "../../db/types/DbRelationship"
import {getDbRelationshipType} from "./getDbRelationshipType"
import {getDbNodeType} from "./getDbNodeType"
import {getRelationship} from "../../db/relationships/getRelationship"
import {RelationshipDirection} from "../../db/types/RelationshipDirection"
import type {GenericRelation} from "./types/GenericRelation"

export async function getRel(
    startNodeId: number,
    relationshipType: RelationshipType,
) {
    const relComposition = getRelComposition(relationshipType)
    const dbRelationshipType: DbRelationship = getDbRelationshipType(relationshipType)
    const modelEndNodeType = relComposition.endNodeType
    const dbEndNodeType = getDbNodeType(modelEndNodeType)
    const isReverseRelationship = relComposition.isReverseRelationship

    const dbRelationship = await getRelationship(
        startNodeId,
        dbRelationshipType,
        dbEndNodeType,
        isReverseRelationship ? RelationshipDirection.REVERSE : RelationshipDirection.FORWARD,
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
