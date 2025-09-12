import {InputCompanyCreate} from "./types/InputCompanyCreate"
import {CompanyNode} from "./types/CompanyNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToCompanyNode} from "./mapDbNodeToCompanyNode"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import {escapeSingleQuotes} from "../escapeSingleQuotes"

export async function createNode(data: InputCompanyCreate): Promise<CompanyNode> {
    const node = await createDbNode(NodeTypeLabel.Company, createNodeQuery(data))

    return mapDbNodeToCompanyNode(node)
}

export function createNodeQuery(data: InputCompanyCreate) {
    let template = getCypherQueryTemplate('nodes/companies/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$name', `'${escapeSingleQuotes(data.name)}'`)
        .replace('$founded', data.founded ? `${data.founded}` : 'null')
        .replace('$defunct', data.defunct ? `${data.defunct}` : 'null')
        .replace('$headquarters_location', data.headquarters_location ? `'${escapeSingleQuotes(data.headquarters_location)}'` : 'null')
        .replace('$legal_headquarters_location', data.legal_headquarters_location ? `'${escapeSingleQuotes(data.legal_headquarters_location)}'` : 'null')
    return template
}
