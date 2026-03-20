import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {ModelCarBrandNode} from "./types/ModelCarBrandNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertModelCarBrandNeo4jNodeToDbNode} from "./convertModelCarBrandNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<ModelCarBrandNode[]> {
    const nodes: ModelCarBrandNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.ModelCarBrand, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertModelCarBrandNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
