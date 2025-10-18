import type {RelationshipType} from "./types/RelationshipType"
import {getDbRelationshipType} from "./getDbRelationshipType"
import {deleteSpecificRelationship} from "../../db/relationships/deleteSpecificRelationship"

export async function deleteSpecificRel(originId: number, destinationId: number, relationshipType: RelationshipType) {
    const dbRelationshipType = getDbRelationshipType(relationshipType)

    return deleteSpecificRelationship(
        originId,
        destinationId,
        dbRelationshipType
    )
}
