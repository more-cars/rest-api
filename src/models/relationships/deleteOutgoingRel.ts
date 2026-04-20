import type {RelType} from "./types/RelType"
import {getRelationship} from "../../db/relationships/getRelationship"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

export async function deleteOutgoingRel(
    originId: number,
    relType: RelType,
) {
    const dbRelationship = await getRelationship(
        originId,
        mapModelRelTypeToDbRelationshipType(relType),
    )

    if (dbRelationship) {
        await deleteRelationshipById(dbRelationship.id)
    }
}
