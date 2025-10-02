import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import {CarModelNode} from "./types/CarModelNode"
import {getDbQueryPaginationParams} from "../getDbQueryPaginationParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToCarModelNode} from "./mapDbNodeToCarModelNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {page: 1}): Promise<Array<CarModelNode>> {
    const nodes: Array<CarModelNode> = []
    const dbParams = getDbQueryPaginationParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.CarModel, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToCarModelNode(dbNode))
    })

    return nodes
}
