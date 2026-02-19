import type {RelType} from "./types/RelType"
import type {RelationshipType} from "../../db/types/RelationshipType"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {createRelationship} from "../../db/relationships/createRelationship"
import type {Rel} from "./types/Rel"
import type {BaseNode} from "../../db/types/BaseNode"

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
        origin: dbRelationship.start_node as BaseNode, // TODO remove type assertion
        destination: dbRelationship.end_node as BaseNode, // TODO remove type assertion
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at
    }

    return modelRel
}
