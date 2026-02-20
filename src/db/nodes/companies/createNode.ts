import {InputCompanyCreate} from "./types/InputCompanyCreate"
import {CompanyNode} from "./types/CompanyNode"
import {createDbNode} from "../createDbNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToCompanyNode} from "./mapDbNodeToCompanyNode"

export async function createNode(data: InputCompanyCreate): Promise<CompanyNode> {
    const node = await createDbNode(DbNodeType.Company, data)

    return mapDbNodeToCompanyNode(node)
}
