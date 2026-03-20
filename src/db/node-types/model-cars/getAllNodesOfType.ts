import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {ModelCarNode} from "./types/ModelCarNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertModelCarNeo4jNodeToDbNode} from "./convertModelCarNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<ModelCarNode[]> {
    const nodes: ModelCarNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.ModelCar, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertModelCarNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
