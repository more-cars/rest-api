import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {SessionResultNode} from "./types/SessionResultNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertSessionResultNeo4jNodeToDbNode} from "./convertSessionResultNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<SessionResultNode[]> {
    const nodes: SessionResultNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.SessionResult, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertSessionResultNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
