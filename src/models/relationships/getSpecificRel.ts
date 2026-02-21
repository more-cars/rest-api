import type {RelType} from "./types/RelType"
import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import type {Rel} from "./types/Rel"
import {convertDbNodeToModelNode} from "../node-types/convertDbNodeToModelNode"

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
        origin: convertDbNodeToModelNode(dbRelationship.start_node),
        destination: convertDbNodeToModelNode(dbRelationship.end_node),
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    }

    return modelRelationship
}
