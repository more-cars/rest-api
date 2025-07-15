import {InputBrandCreate} from "./types/InputBrandCreate"
import {BrandNode} from "./types/BrandNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToBrandNode} from "./mapDbNodeToBrandNode"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import {escapeSingleQuotes} from "../escapeSingleQuotes"

export async function createNode(data: InputBrandCreate): Promise<BrandNode> {
    const node = await createDbNode(NodeTypeLabel.Brand, createNodeQuery(data))

    return mapDbNodeToBrandNode(node)
}

export function createNodeQuery(data: InputBrandCreate) {
    let template = getCypherQueryTemplate('nodes/brands/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$name', `'${escapeSingleQuotes(data.name)}'`)
        .replace('$full_name', data.full_name ? `'${escapeSingleQuotes(data.full_name)}'` : 'null')
        .replace('$founded', data.founded ? `${data.founded}` : 'null')
        .replace('$defunct', data.defunct ? `${data.defunct}` : 'null')
        .replace('$wmi', data.wmi ? `'${escapeSingleQuotes(data.wmi)}'` : 'null')
        .replace('$hsn', data.hsn ? `'${escapeSingleQuotes(data.hsn)}'` : 'null')

    return template
}
