import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {RacingEventNode} from "./types/RacingEventNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToRacingEventNode} from "./mapDbNodeToRacingEventNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<RacingEventNode[]> {
    const nodes: RacingEventNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.RacingEvent, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToRacingEventNode(dbNode))
    })

    return nodes
}
