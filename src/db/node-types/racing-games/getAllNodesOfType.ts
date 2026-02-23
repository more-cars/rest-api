import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {RacingGameNode} from "./types/RacingGameNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToRacingGameNode} from "./mapDbNodeToRacingGameNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<RacingGameNode[]> {
    const nodes: RacingGameNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.RacingGame, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToRacingGameNode(dbNode))
    })

    return nodes
}
