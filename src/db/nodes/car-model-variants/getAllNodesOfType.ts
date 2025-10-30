import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {CarModelVariantNode} from "./types/CarModelVariantNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToCarModelVariantNode} from "./mapDbNodeToCarModelVariantNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<Array<CarModelVariantNode>> {
    const nodes: Array<CarModelVariantNode> = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.CarModelVariant, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToCarModelVariantNode(dbNode))
    })

    return nodes
}
