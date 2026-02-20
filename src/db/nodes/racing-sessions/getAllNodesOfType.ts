import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {RacingSessionNode} from "./types/RacingSessionNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToRacingSessionNode} from "./mapDbNodeToRacingSessionNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<RacingSessionNode[]> {
    const nodes: RacingSessionNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(Neo4jNodeType.RacingSession, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToRacingSessionNode(dbNode))
    })

    return nodes
}
