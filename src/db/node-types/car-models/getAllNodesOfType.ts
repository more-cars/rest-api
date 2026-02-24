import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import {CarModelNode} from "./types/CarModelNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertCarModelNeo4jNodeToDbNode} from "./convertCarModelNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<CarModelNode[]> {
    const nodes: CarModelNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.CarModel, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertCarModelNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
