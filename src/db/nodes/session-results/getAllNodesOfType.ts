import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {SessionResultNode} from "./types/SessionResultNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToSessionResultNode} from "./mapDbNodeToSessionResultNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<SessionResultNode[]> {
    const nodes: SessionResultNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.SessionResult, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToSessionResultNode(dbNode))
    })

    return nodes
}
