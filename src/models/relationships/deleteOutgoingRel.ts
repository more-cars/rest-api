import type {RelType} from "./types/RelType"
import {DbNodeType} from "../../db/types/DbNodeType"
import {getRelationship} from "../../db/relationships/getRelationship"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

export async function deleteOutgoingRel(
    originId: number,
    relType: RelType,
    destinationType: DbNodeType,
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
