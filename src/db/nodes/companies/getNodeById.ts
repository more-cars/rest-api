import {CompanyNode} from "./types/CompanyNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToCompanyNode} from "./mapDbNodeToCompanyNode"

export async function getNodeById(id: number): Promise<false | CompanyNode> {
    const node = await fetchNodeFromDb(id, NodeTypeLabel.Company)

    if (!node) {
        return false
    }

    return mapDbNodeToCompanyNode(node)
}
