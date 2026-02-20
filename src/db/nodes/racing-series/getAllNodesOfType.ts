import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {RacingSeriesNode} from "./types/RacingSeriesNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToRacingSeriesNode} from "./mapDbNodeToRacingSeriesNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<RacingSeriesNode[]> {
    const nodes: RacingSeriesNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.RacingSeries, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToRacingSeriesNode(dbNode))
    })

    return nodes
}
