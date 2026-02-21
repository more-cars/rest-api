import type {RelType} from "./types/RelType"
import type {ModelNodeType} from "../types/ModelNodeType"
import {getRelationship} from "../../db/relationships/getRelationship"
import {mapModelRelTypeToDbRelationshipType} from "./mapModelRelTypeToDbRelationshipType"
import {mapModelNodeTypeToDbNodeType} from "../node-types/mapModelNodeTypeToDbNodeType"
import {deleteRelationshipById} from "../../db/relationships/deleteRelationshipById"

export async function deleteOutgoingRel(
    originId: number,
    relType: RelType,
    destinationType: ModelNodeType,
) {
    const dbRelationship = await getRelationship(
        originId,
        mapModelRelTypeToDbRelationshipType(relType),
        mapModelNodeTypeToDbNodeType(destinationType),
    )

    if (dbRelationship) {
        await deleteRelationshipById(dbRelationship.id)
    }
}
