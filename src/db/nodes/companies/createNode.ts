import {InputCompanyCreate} from "./types/InputCompanyCreate"
import {CompanyNode} from "./types/CompanyNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToCompanyNode} from "./mapDbNodeToCompanyNode"

export async function createNode(data: InputCompanyCreate): Promise<CompanyNode> {
    const node = await createDbNode(NodeTypeLabel.Company, data)

    return mapDbNodeToCompanyNode(node)
}
