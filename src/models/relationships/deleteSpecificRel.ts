import type {RelType} from "./types/RelType"
import {getDbRelationshipType} from "./getDbRelationshipType"
import {deleteSpecificRelationship} from "../../db/relationships/deleteSpecificRelationship"

export async function deleteSpecificRel(originId: number, destinationId: number, relationshipType: RelType) {
    const dbRelationshipType = getDbRelationshipType(relationshipType)

    return deleteSpecificRelationship(
        originId,
        destinationId,
        dbRelationshipType
    )
}
