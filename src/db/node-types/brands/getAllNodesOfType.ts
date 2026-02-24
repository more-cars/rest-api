import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {BrandNode} from "./types/BrandNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertBrandNeo4jNodeToDbNode} from "./convertBrandNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<BrandNode[]> {
    const nodes: BrandNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.Brand, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertBrandNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
