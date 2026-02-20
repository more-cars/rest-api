import type {RelType} from "./types/RelType"
import {getRelComposition} from "./getRelComposition"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {mapModelNodeTypeToDbNodeType} from "./mapModelNodeTypeToDbNodeType"
import {getRelationshipCollection} from "../../db/relationships/getRelationshipCollection"
import type {Rel} from "./types/Rel"
import type {DbNode} from "../../db/types/DbNode"

export async function getAllRels(
    startNodeId: number,
    relType: RelType
) {
    const relComposition = getRelComposition(relType)
    const dbRelationshipType = mapModelRelTypeToDbRelationshipType(relType)
    const modelEndNodeType = relComposition.endNodeType
    const dbEndNodeType = mapModelNodeTypeToDbNodeType(modelEndNodeType)

    const dbRelationships = await getRelationshipCollection(
        startNodeId,
        dbRelationshipType,
        dbEndNodeType,
    )

    const rels: Rel[] = []

    for (const dbRelationship of dbRelationships) {
        rels.push({
            id: dbRelationship.id,
            type: relType,
            origin: dbRelationship.start_node as DbNode, // TODO remove type assertion
            destination: dbRelationship.end_node as DbNode, // TODO remove type assertion
            created_at: dbRelationship.created_at,
            updated_at: dbRelationship.updated_at,
        })
    }

    return rels
}
