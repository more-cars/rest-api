import type {RelType} from "./types/RelType"
import type {Neo4jNodeType} from "../../db/types/Neo4jNodeType"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"
import {getRelationshipByEndNode} from "../../db/relationships/getRelationshipByEndNode"

export async function deleteIncomingRel(
    destinationId: number,
    relType: RelType,
    originType: Neo4jNodeType,
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
