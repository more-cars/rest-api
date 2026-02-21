import type {RelType} from "./types/RelType"
import {getRelComposition} from "./getRelComposition"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {mapModelNodeTypeToDbNodeType} from "./mapModelNodeTypeToDbNodeType"
import {getRelationship} from "../../db/relationships/getRelationship"
import type {Rel} from "./types/Rel"
import {convertDbNodeToModelNode} from "../node-types/convertDbNodeToModelNode"

export async function getRel(
    startNodeId: number,
    relType: RelType,
) {
    const relComposition = getRelComposition(relType)
    const dbRelationshipType = mapModelRelTypeToDbRelationshipType(relType)
    const modelEndNodeType = relComposition.endNodeType
    const dbEndNodeType = mapModelNodeTypeToDbNodeType(modelEndNodeType)

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
