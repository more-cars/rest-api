import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {GamingPlatformNode} from "./types/GamingPlatformNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertGamingPlatformNeo4jNodeToDbNode} from "./convertGamingPlatformNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<GamingPlatformNode[]> {
    const nodes: GamingPlatformNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.GamingPlatform, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertGamingPlatformNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
