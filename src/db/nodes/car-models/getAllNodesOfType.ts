import {CarModelNode} from "./types/CarModelNode"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToCarModelNode} from "./mapDbNodeToCarModelNode"

export async function getAllNodesOfType(): Promise<Array<CarModelNode>> {
    const nodes: Array<CarModelNode> = []

    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.CarModel)
    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToCarModelNode(dbNode))
    })

    return nodes
}
