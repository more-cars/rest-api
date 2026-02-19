import type {RelType} from "./types/RelType"
import type {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {getRelationship} from "../../db/relationships/getRelationship"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

export async function deleteOutgoingRel(
    originId: number,
    relType: RelType,
    destinationType: NodeTypeLabel,
) {
    const dbRelationship = await getRelationship(
        originId,
        mapModelRelTypeToDbRelationshipType(relType),
        destinationType,
    )

    if (dbRelationship) {
        await deleteRelationshipById(dbRelationship.id)
    }
}
