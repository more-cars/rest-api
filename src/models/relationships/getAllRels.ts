import type {RelationshipType} from "./types/RelationshipType"
import type {DbRelationship} from "../../db/types/DbRelationship"
import {getDbRelationshipType} from "./getDbRelationshipType"
import {getRelationshipsForSpecificNode} from "../../db/relationships/getRelationshipsForSpecificNode"
import type {GenericRelation} from "./types/GenericRelation"
import {Node} from "../Node"

export async function getAllRels(nodeId: number, relationshipType: RelationshipType) {
    const dbRelationshipType: DbRelationship = getDbRelationshipType(relationshipType)

    const relationships = await getRelationshipsForSpecificNode(
        nodeId,
        dbRelationshipType,
    )

    const mappedRelationships: GenericRelation[] = []

    for (const relationship of relationships) {
        mappedRelationships.push({
            id: relationship.id || relationship.relationship_id,
            type: relationshipType,
            origin: await Node.findById(relationship.start_node_id),
            destination: await Node.findById(relationship.end_node_id),
            created_at: relationship.created_at,
            updated_at: relationship.updated_at,
        } as GenericRelation)
    }

    return mappedRelationships
}
