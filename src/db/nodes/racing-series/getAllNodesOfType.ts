import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {RacingSeriesNode} from "./types/RacingSeriesNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRacingSeriesNode} from "./mapDbNodeToRacingSeriesNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<Array<RacingSeriesNode>> {
    const nodes: Array<RacingSeriesNode> = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.RacingSeries, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToRacingSeriesNode(dbNode))
    })

    return nodes
}
