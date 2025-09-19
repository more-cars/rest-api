import type {CompanyNode} from "./types/CompanyNode"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToCompanyNode} from "./mapDbNodeToCompanyNode"

export async function getAllNodesOfType(): Promise<Array<CompanyNode>> {
    const nodes: Array<CompanyNode> = []

    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.Company)
    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToCompanyNode(dbNode))
    })

    return nodes
}
