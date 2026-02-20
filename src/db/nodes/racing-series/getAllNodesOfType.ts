import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {RacingSeriesNode} from "./types/RacingSeriesNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToRacingSeriesNode} from "./mapDbNodeToRacingSeriesNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<RacingSeriesNode[]> {
    const nodes: RacingSeriesNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(Neo4jNodeType.RacingSeries, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToRacingSeriesNode(dbNode))
    })

    return nodes
}
