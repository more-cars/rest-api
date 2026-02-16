import {CompanyNode} from "./types/CompanyNode"
import {fetchNodeById} from "../fetchNodeById"
import {mapDbNodeToCompanyNode} from "./mapDbNodeToCompanyNode"

export async function getNodeById(id: number): Promise<false | CompanyNode> {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return mapDbNodeToCompanyNode(node)
}
