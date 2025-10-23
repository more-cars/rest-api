import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {RacingEventNode} from "./types/RacingEventNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRacingEventNode} from "./mapDbNodeToRacingEventNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<Array<RacingEventNode>> {
    const nodes: Array<RacingEventNode> = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.RacingEvent, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToRacingEventNode(dbNode))
    })

    return nodes
}
