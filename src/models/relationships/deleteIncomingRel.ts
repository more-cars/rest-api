import type {RelType} from "./types/RelType"
import type {ModelNodeType} from "../types/ModelNodeType"
import {getRelationshipByEndNode} from "../../db/relationships/getRelationshipByEndNode"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {mapModelNodeTypeToDbNodeType} from "../node-types/mapModelNodeTypeToDbNodeType"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

export async function deleteIncomingRel(
    destinationId: number,
    relType: RelType,
    originType: ModelNodeType,
) {
    const dbRelationship = await getRelationshipByEndNode(
        destinationId,
        mapModelRelTypeToDbRelationshipType(relType),
        mapModelNodeTypeToDbNodeType(originType),
    )

    if (dbRelationship) {
        await deleteRelationshipById(dbRelationship.id)
    }
}
