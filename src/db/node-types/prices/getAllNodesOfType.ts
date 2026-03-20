import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {PriceNode} from "./types/PriceNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertPriceNeo4jNodeToDbNode} from "./convertPriceNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<PriceNode[]> {
    const nodes: PriceNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.Price, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertPriceNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
