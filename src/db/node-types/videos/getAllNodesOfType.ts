import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {VideoNode} from "./types/VideoNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertVideoNeo4jNodeToDbNode} from "./convertVideoNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<VideoNode[]> {
    const nodes: VideoNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.Video, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertVideoNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
