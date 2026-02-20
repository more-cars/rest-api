import type {RelType} from "./types/RelType"
import type {DbNodeType} from "../../db/types/DbNodeType"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"
import {getRelationshipByEndNode} from "../../db/relationships/getRelationshipByEndNode"

export async function deleteIncomingRel(
    destinationId: number,
    relType: RelType,
    originType: DbNodeType,
) {
    const dbRelationship = await getRelationshipByEndNode(
        destinationId,
        mapModelRelTypeToDbRelationshipType(relType),
        originType,
    )

    if (dbRelationship) {
        await deleteRelationshipById(dbRelationship.id)
    }
}
