import type {RelType} from "./types/RelType"
import {getRelationshipByEndNode} from "../../db/relationships/getRelationshipByEndNode"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

export async function deleteIncomingRel(
    destinationId: number,
    relType: RelType,
) {
    const dbRelationship = await getRelationshipByEndNode(
        destinationId,
        mapModelRelTypeToDbRelationshipType(relType),
    )

    if (dbRelationship) {
        await deleteRelationshipById(dbRelationship.id)
    }
}
