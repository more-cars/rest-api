import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {LapTimeNode} from "./types/LapTimeNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToLapTimeNode} from "./mapDbNodeToLapTimeNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<Array<LapTimeNode>> {
    const nodes: Array<LapTimeNode> = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.LapTime, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToLapTimeNode(dbNode))
    })

    return nodes
}
