import type {RelationshipType} from "./types/RelationshipType"
import type {DbRelationship} from "../../db/types/DbRelationship"
import {getDbRelationshipType} from "./getDbRelationshipType"
import {getRelationshipCollection} from "../../db/relationships/getRelationshipCollection"
import type {GenericRelation} from "./types/GenericRelation"

export async function getAllRels(nodeId: number, relationshipType: RelationshipType) {
    const dbRelationshipType: DbRelationship = getDbRelationshipType(relationshipType)

    const relationships = await getRelationshipCollection(
        nodeId,
        dbRelationshipType,
    )

    const mappedRelationships: GenericRelation[] = []

    for (const relationship of relationships) {
        mappedRelationships.push({
            id: relationship.id,
            type: relationshipType,
            origin: relationship.start_node,
            destination: relationship.end_node,
            created_at: relationship.created_at,
            updated_at: relationship.updated_at,
        } as GenericRelation)
    }

    return mappedRelationships
}
