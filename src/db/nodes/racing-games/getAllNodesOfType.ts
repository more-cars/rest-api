import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {RacingGameNode} from "./types/RacingGameNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToRacingGameNode} from "./mapDbNodeToRacingGameNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<RacingGameNode[]> {
    const nodes: RacingGameNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(Neo4jNodeType.RacingGame, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToRacingGameNode(dbNode))
    })

    return nodes
}
