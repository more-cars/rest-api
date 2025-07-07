import {BrandNode} from "./types/BrandNode"
import {fetchNodesFromDb} from "../fetchNodesFromDb.ts"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToBrandNode} from "./mapDbNodeToBrandNode.ts"

export async function getAllNodesOfType(): Promise<Array<BrandNode>> {
    const nodes: Array<BrandNode> = []

    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.Brand)
    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToBrandNode(dbNode))
    })

    return nodes
}
