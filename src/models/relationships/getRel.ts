import type {RelType} from "./types/RelType"
import {getRelComposition} from "./getRelComposition"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {getDbNodeType} from "./getDbNodeType"
import {getRelationship} from "../../db/relationships/getRelationship"
import type {Rel} from "./types/Rel"
import type {DbNode} from "../../db/types/DbNode"

export async function getRel(
    startNodeId: number,
    relType: RelType,
) {
    const relComposition = getRelComposition(relType)
    const dbRelationshipType = mapModelRelTypeToDbRelationshipType(relType)
    const modelEndNodeType = relComposition.endNodeType
    const dbEndNodeType = getDbNodeType(modelEndNodeType)

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
        origin: dbRelationship.start_node as DbNode, // TODO return model node instead of db node
        destination: dbRelationship.end_node as DbNode, // TODO return model node instead of db node
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    }

    return rel
}
