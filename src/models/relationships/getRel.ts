import type {RelationshipType} from "./types/RelationshipType"
import {getRelComposition} from "./getRelComposition"
import {getDbRelationshipType} from "./getDbRelationshipType"
import {getDbNodeType} from "./getDbNodeType"
import {getRelationship} from "../../db/relationships/getRelationship"
import {RelationshipDirection} from "../../db/types/RelationshipDirection"
import type {GenericRelation} from "./types/GenericRelation"
import type {BaseNode} from "../../db/types/BaseNode"

export async function getRel(
    startNodeId: number,
    relationshipType: RelationshipType,
) {
    const relComposition = getRelComposition(relationshipType)
    const dbRelationshipType = getDbRelationshipType(relationshipType)
    const modelEndNodeType = relComposition.endNodeType
    const dbEndNodeType = getDbNodeType(modelEndNodeType)
    const isReverseRel = relComposition.isReverseRelationship

    const dbRelationship = await getRelationship(
        startNodeId,
        dbRelationshipType,
        dbEndNodeType,
        isReverseRel ? RelationshipDirection.REVERSE : RelationshipDirection.FORWARD,
    )

    if (!dbRelationship) {
        return false
    }

    const modelRelationship: GenericRelation = {
        id: dbRelationship.relationship_id,
        type: relationshipType,
        origin: dbRelationship.start_node as BaseNode, // TODO remove type assertion
        destination: dbRelationship.end_node as BaseNode, // TODO remove type assertion
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    }

    return modelRelationship
}
