import {InputCompanyCreate} from "./types/InputCompanyCreate"
import {CompanyNode} from "./types/CompanyNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertCompanyNeo4jNodeToDbNode} from "./convertCompanyNeo4jNodeToDbNode"

export async function createNode(data: InputCompanyCreate): Promise<CompanyNode> {
    const node = await createNeo4jNode(DbNodeType.Company, data)

    return convertCompanyNeo4jNodeToDbNode(node)
}
