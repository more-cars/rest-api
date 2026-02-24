import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {LapTimeNode} from "./types/LapTimeNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertLapTimeNeo4jNodeToDbNode} from "./convertLapTimeNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<LapTimeNode[]> {
    const nodes: LapTimeNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.LapTime, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertLapTimeNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
