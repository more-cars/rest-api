import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {RacingSessionNode} from "./types/RacingSessionNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertRacingSessionNeo4jNodeToDbNode} from "./convertRacingSessionNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<RacingSessionNode[]> {
    const nodes: RacingSessionNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.RacingSession, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertRacingSessionNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
