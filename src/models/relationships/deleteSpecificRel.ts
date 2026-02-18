import type {RelType} from "./types/RelType"
import {mapModelRelTypeToDbRelType} from "./mapModelRelTypeToDbRelType"
import {deleteSpecificRelationship} from "../../db/relationships/deleteSpecificRelationship"

export async function deleteSpecificRel(originId: number, destinationId: number, relationshipType: RelType) {
    const dbRelationshipType = mapModelRelTypeToDbRelType(relationshipType)

    return deleteSpecificRelationship(
        originId,
        destinationId,
        dbRelationshipType
    )
}
