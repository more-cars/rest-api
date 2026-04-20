import type {RelType} from "./types/RelType"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {getRelationshipCollection} from "../../db/relationships/getRelationshipCollection"
import type {Rel} from "./types/Rel"
import {convertDbNodeToModelNode} from "../node-types/convertDbNodeToModelNode"

export async function getAllRels(
    startNodeId: number,
    relType: RelType
) {
    const dbRelationshipType = mapModelRelTypeToDbRelationshipType(relType)

    const dbRelationships = await getRelationshipCollection(
        startNodeId,
        dbRelationshipType,
    )

    const rels: Rel[] = []

    for (const dbRelationship of dbRelationships) {
        rels.push({
            id: dbRelationship.id,
            type: relType,
            origin: convertDbNodeToModelNode(dbRelationship.start_node),
            destination: convertDbNodeToModelNode(dbRelationship.end_node),
            created_at: dbRelationship.created_at,
            updated_at: dbRelationship.updated_at,
        })
    }

    return rels
}
