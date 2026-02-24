import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {CarModelVariantNode} from "./types/CarModelVariantNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertCarModelVariantNeo4jNodeToDbNode} from "./convertCarModelVariantNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<CarModelVariantNode[]> {
    const nodes: CarModelVariantNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.CarModelVariant, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertCarModelVariantNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
