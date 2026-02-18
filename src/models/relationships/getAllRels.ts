import type {RelType} from "./types/RelType"
import {getRelComposition} from "./getRelComposition"
import {getDbRelationshipType} from "./getDbRelationshipType"
import {getDbNodeType} from "./getDbNodeType"
import {getRelationshipCollection} from "../../db/relationships/getRelationshipCollection"
import type {GenericRelation} from "./types/GenericRelation"
import type {BaseNode} from "../../db/types/BaseNode"

export async function getAllRels(
    startNodeId: number,
    relationshipType: RelType
) {
    const relComposition = getRelComposition(relationshipType)
    const dbRelationshipType = getDbRelationshipType(relationshipType)
    const modelEndNodeType = relComposition.endNodeType
    const dbEndNodeType = getDbNodeType(modelEndNodeType)

    const dbRelationships = await getRelationshipCollection(
        startNodeId,
        dbRelationshipType,
        dbEndNodeType,
    )

    const mappedRelationships: GenericRelation[] = []

    for (const dbRelationship of dbRelationships) {
        mappedRelationships.push({
            id: dbRelationship.relationship_id,
            type: relationshipType,
            origin: dbRelationship.start_node as BaseNode, // TODO remove type assertion
            destination: dbRelationship.end_node as BaseNode, // TODO remove type assertion
            created_at: dbRelationship.created_at,
            updated_at: dbRelationship.updated_at,
        })
    }

    return mappedRelationships
}
