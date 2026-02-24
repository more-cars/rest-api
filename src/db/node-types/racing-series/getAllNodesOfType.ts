import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {RacingSeriesNode} from "./types/RacingSeriesNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertRacingSeriesNeo4jNodeToDbNode} from "./convertRacingSeriesNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<RacingSeriesNode[]> {
    const nodes: RacingSeriesNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.RacingSeries, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertRacingSeriesNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
