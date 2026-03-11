import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {MotorShowNode} from "./types/MotorShowNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertMotorShowNeo4jNodeToDbNode} from "./convertMotorShowNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<MotorShowNode[]> {
    const nodes: MotorShowNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.MotorShow, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertMotorShowNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
