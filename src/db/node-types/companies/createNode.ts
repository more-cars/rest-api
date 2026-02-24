import {InputCompanyCreate} from "./types/InputCompanyCreate"
import {CompanyNode} from "./types/CompanyNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToCompanyNode} from "./mapDbNodeToCompanyNode"

export async function createNode(data: InputCompanyCreate): Promise<CompanyNode> {
    const node = await createNeo4jNode(DbNodeType.Company, data)

    return mapDbNodeToCompanyNode(node)
}
