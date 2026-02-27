import type {RelType} from "./types/RelType"
import {getRelationshipTypeSpecification} from "../../specification/getRelationshipTypeSpecification"
import {mapModelRelationshipTypeToRelationshipType} from "../../specification/mapModelRelationshipTypeToRelationshipType"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {mapNodeTypeToDbNodeType} from "../../specification/mapNodeTypeToDbNodeType"
import {getRelationship} from "../../db/relationships/getRelationship"
import type {Rel} from "./types/Rel"
import {convertDbNodeToModelNode} from "../node-types/convertDbNodeToModelNode"

export async function getRel(
    startNodeId: number,
    relType: RelType,
) {
    const relationshipTypeSpecification = getRelationshipTypeSpecification(mapModelRelationshipTypeToRelationshipType(relType))
    const dbRelationshipType = mapModelRelTypeToDbRelationshipType(relType)
    const dbEndNodeType = mapNodeTypeToDbNodeType(relationshipTypeSpecification.endNodeType)

    const dbRelationship = await getRelationship(
        startNodeId,
        dbRelationshipType,
        dbEndNodeType,
    )

    if (!dbRelationship) {
        return false
    }

    const rel: Rel = {
        id: dbRelationship.id,
        type: relType,
        origin: convertDbNodeToModelNode(dbRelationship.start_node),
        destination: convertDbNodeToModelNode(dbRelationship.end_node),
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    }

    return rel
}
