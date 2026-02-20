import type {RelType} from "./types/RelType"
import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import type {Rel} from "./types/Rel"
import type {DbNode} from "../../db/types/DbNode"

export async function getSpecificRel(
    originId: number,
    destinationId: number,
    relationshipType: RelType,
) {
    const dbRelationship = await getSpecificRelationship(
        originId,
        destinationId,
        mapModelRelTypeToDbRelationshipType(relationshipType),
    )

    if (!dbRelationship) {
        return false
    }

    const modelRelationship: Rel = {
        id: dbRelationship.id,
        type: relationshipType,
        origin: dbRelationship.start_node as DbNode, // TODO remove type assertion
        destination: dbRelationship.end_node as DbNode, // TODO remove type assertion
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    }

    return modelRelationship
}
