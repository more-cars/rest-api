import type {RelType} from "./types/RelType"
import type {Neo4jNodeType} from "../../db/types/Neo4jNodeType"
import {getRelationship} from "../../db/relationships/getRelationship"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

export async function deleteOutgoingRel(
    originId: number,
    relType: RelType,
    destinationType: Neo4jNodeType,
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
