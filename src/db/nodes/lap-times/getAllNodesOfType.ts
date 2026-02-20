import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {LapTimeNode} from "./types/LapTimeNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToLapTimeNode} from "./mapDbNodeToLapTimeNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<LapTimeNode[]> {
    const nodes: LapTimeNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.LapTime, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToLapTimeNode(dbNode))
    })

    return nodes
}
