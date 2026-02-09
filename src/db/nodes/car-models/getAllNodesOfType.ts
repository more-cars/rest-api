import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import {CarModelNode} from "./types/CarModelNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToCarModelNode} from "./mapDbNodeToCarModelNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<CarModelNode[]> {
    const nodes: CarModelNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.CarModel, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToCarModelNode(dbNode))
    })

    return nodes
}
