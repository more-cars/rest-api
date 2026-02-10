import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {RacingGameNode} from "./types/RacingGameNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRacingGameNode} from "./mapDbNodeToRacingGameNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<RacingGameNode[]> {
    const nodes: RacingGameNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.RacingGame, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToRacingGameNode(dbNode))
    })

    return nodes
}
