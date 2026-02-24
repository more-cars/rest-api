import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import {ImageNode} from "./types/ImageNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertImageNeo4jNodeToDbNode} from "./convertImageNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<ImageNode[]> {
    const nodes: ImageNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.Image, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertImageNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
