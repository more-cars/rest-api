import {InputCompanyCreate} from "./types/InputCompanyCreate"
import {CompanyNode} from "./types/CompanyNode"
import {createDbNode} from "../createDbNode"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToCompanyNode} from "./mapDbNodeToCompanyNode"

export async function createNode(data: InputCompanyCreate): Promise<CompanyNode> {
    const node = await createDbNode(Neo4jNodeType.Company, data)

    return mapDbNodeToCompanyNode(node)
}
