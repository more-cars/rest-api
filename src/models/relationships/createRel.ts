import type {RelType} from "./types/RelType"
import type {DbRelationship} from "../../db/types/DbRelationship"
import {getDbRelationshipType} from "./getDbRelationshipType"
import {createRelationship} from "../../db/relationships/createRelationship"
import type {GenericRelation} from "./types/GenericRelation"
import type {BaseNode} from "../../db/types/BaseNode"

export async function createRel(originId: number, destinationId: number, relType: RelType) {
    const dbRelationshipType: DbRelationship = getDbRelationshipType(relType)

    const dbRelationship = await createRelationship(
        originId,
        destinationId,
        dbRelationshipType,
    )

    if (!dbRelationship) {
        return false
    }

    const modelRel: GenericRelation = {
        id: dbRelationship.id || dbRelationship.relationship_id,
        type: relType,
        origin: dbRelationship.start_node as BaseNode, // TODO remove type assertion
        destination: dbRelationship.end_node as BaseNode, // TODO remove type assertion
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at
    }

    return modelRel
}
