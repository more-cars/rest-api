import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {RatingNode} from "./types/RatingNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertRatingNeo4jNodeToDbNode} from "./convertRatingNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<RatingNode[]> {
    const nodes: RatingNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.Rating, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertRatingNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
