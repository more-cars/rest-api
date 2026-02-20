import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {GamingPlatformNode} from "./types/GamingPlatformNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToGamingPlatformNode} from "./mapDbNodeToGamingPlatformNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<GamingPlatformNode[]> {
    const nodes: GamingPlatformNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.GamingPlatform, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToGamingPlatformNode(dbNode))
    })

    return nodes
}
