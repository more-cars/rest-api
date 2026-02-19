import type {RelType} from "./types/RelType"
import {getRelComposition} from "./getRelComposition"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {getDbNodeType} from "./getDbNodeType"
import {getRelationshipCollection} from "../../db/relationships/getRelationshipCollection"
import type {Rel} from "./types/Rel"
import type {BaseNode} from "../../db/types/BaseNode"

export async function getAllRels(
    startNodeId: number,
    relType: RelType
) {
    const relComposition = getRelComposition(relType)
    const dbRelationshipType = mapModelRelTypeToDbRelationshipType(relType)
    const modelEndNodeType = relComposition.endNodeType
    const dbEndNodeType = getDbNodeType(modelEndNodeType)

    const dbRelationships = await getRelationshipCollection(
        startNodeId,
        dbRelationshipType,
        dbEndNodeType,
    )

    const rels: Rel[] = []

    for (const dbRelationship of dbRelationships) {
        rels.push({
            id: dbRelationship.relationship_id,
            type: relType,
            origin: dbRelationship.start_node as BaseNode, // TODO remove type assertion
            destination: dbRelationship.end_node as BaseNode, // TODO remove type assertion
            created_at: dbRelationship.created_at,
            updated_at: dbRelationship.updated_at,
        })
    }

    return rels
}
