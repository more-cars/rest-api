import type {RelType} from "./types/RelType"
import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {getDbRelationshipType} from "./getDbRelationshipType"
import type {GenericRelation} from "./types/GenericRelation"
import type {BaseNode} from "../../db/types/BaseNode"

export async function getSpecificRel(
    originId: number,
    destinationId: number,
    relationshipType: RelType,
) {
    const dbRelationship = await getSpecificRelationship(
        originId,
        destinationId,
        getDbRelationshipType(relationshipType),
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
