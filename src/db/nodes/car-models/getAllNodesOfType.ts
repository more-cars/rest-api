import {CarModelNode} from "./types/CarModelNode"
import {fetchNodesFromDb} from "../fetchNodesFromDb.ts"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToCarModelNode} from "./mapDbNodeToCarModelNode.ts"

export async function getAllNodesOfType(): Promise<Array<CarModelNode>> {
    const nodes: Array<CarModelNode> = []

    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.CarModel)
    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToCarModelNode(dbNode))
    })

    return nodes
}
