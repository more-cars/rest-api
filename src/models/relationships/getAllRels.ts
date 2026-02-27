import type {RelType} from "./types/RelType"
import {getRelationshipTypeSpecification} from "../../specification/getRelationshipTypeSpecification"
import {mapModelRelationshipTypeToRelationshipType} from "../../specification/mapModelRelationshipTypeToRelationshipType"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {mapNodeTypeToDbNodeType} from "../../specification/mapNodeTypeToDbNodeType"
import {getRelationshipCollection} from "../../db/relationships/getRelationshipCollection"
import type {Rel} from "./types/Rel"
import {convertDbNodeToModelNode} from "../node-types/convertDbNodeToModelNode"

export async function getAllRels(
    startNodeId: number,
    relType: RelType
) {
    const relationshipTypeSpecification = getRelationshipTypeSpecification(mapModelRelationshipTypeToRelationshipType(relType))
    const dbRelationshipType = mapModelRelTypeToDbRelationshipType(relType)
    const dbEndNodeType = mapNodeTypeToDbNodeType(relationshipTypeSpecification.endNodeType)

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
            origin: convertDbNodeToModelNode(dbRelationship.start_node),
            destination: convertDbNodeToModelNode(dbRelationship.end_node),
            created_at: dbRelationship.created_at,
            updated_at: dbRelationship.updated_at,
        })
    }

    return rels
}
