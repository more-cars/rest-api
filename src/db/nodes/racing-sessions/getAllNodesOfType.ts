import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {RacingSessionNode} from "./types/RacingSessionNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRacingSessionNode} from "./mapDbNodeToRacingSessionNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<Array<RacingSessionNode>> {
    const nodes: Array<RacingSessionNode> = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.RacingSession, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToRacingSessionNode(dbNode))
    })

    return nodes
}
