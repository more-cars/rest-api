import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {CarModelVariantNode} from "./types/CarModelVariantNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToCarModelVariantNode} from "./mapDbNodeToCarModelVariantNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<CarModelVariantNode[]> {
    const nodes: CarModelVariantNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.CarModelVariant, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToCarModelVariantNode(dbNode))
    })

    return nodes
}
