import {InputCompanyCreate} from "./types/InputCompanyCreate"
import {CompanyNode} from "./types/CompanyNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputCompanyCreate): Promise<CompanyNode> {
    return await createNeo4jNode(DbNodeType.Company, data) as CompanyNode
}
