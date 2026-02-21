import type {RelType} from "./types/RelType"
import type {RelationshipType} from "../../db/types/RelationshipType"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {createRelationship} from "../../db/relationships/createRelationship"
import type {Rel} from "./types/Rel"
import {convertDbNodeToModelNode} from "../node-types/convertDbNodeToModelNode"

export async function createRel(originId: number, destinationId: number, relType: RelType) {
    const dbRelationshipType: RelationshipType = mapModelRelTypeToDbRelationshipType(relType)

    const dbRelationship = await createRelationship(
        originId,
        destinationId,
        dbRelationshipType,
    )

    if (!dbRelationship) {
        return false
    }

    const modelRel: Rel = {
        id: dbRelationship.id,
        type: relType,
        origin: convertDbNodeToModelNode(dbRelationship.start_node),
        destination: convertDbNodeToModelNode(dbRelationship.end_node),
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at
    }

    return modelRel
}
