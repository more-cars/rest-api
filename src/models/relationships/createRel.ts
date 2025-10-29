import type {RelationshipType} from "./types/RelationshipType"
import type {DbRelationship} from "../../db/types/DbRelationship"
import {getDbRelationshipType} from "./getDbRelationshipType"
import {createRelationship} from "../../db/relationships/createRelationship"
import type {GenericRelation} from "./types/GenericRelation"
import {Node} from "../Node"

export async function createRel(originId: number, destinationId: number, relationshipType: RelationshipType) {
    const dbRelationshipType: DbRelationship = getDbRelationshipType(relationshipType)
    // TODO replace quick'n'dirty with proper solution
    const isReverseRelationship =
        relationshipType.includes('BELONGS_TO') ||
        relationshipType.includes('IS_') ||
        relationshipType.includes('ACHIEVED_ON_') ||
        relationshipType.includes('WAS_')

    const dbRelationship = await createRelationship(
        isReverseRelationship ? destinationId : originId,
        isReverseRelationship ? originId : destinationId,
        dbRelationshipType,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        id: dbRelationship.id || dbRelationship.relationship_id,
        type: relationshipType,
        origin: await Node.findById(originId),
        destination: await Node.findById(destinationId),
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at
    } as GenericRelation
}
