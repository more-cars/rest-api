import type {RelType} from "./types/RelType"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {deleteSpecificRelationship} from "../../db/relationships/deleteSpecificRelationship"

export async function deleteSpecificRel(originId: number, destinationId: number, relType: RelType) {
    const dbRelationshipType = mapModelRelTypeToDbRelationshipType(relType)

    return deleteSpecificRelationship(
        originId,
        destinationId,
        dbRelationshipType
    )
}
