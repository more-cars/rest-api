import {InputGamingPlatformCreate} from "./types/InputGamingPlatformCreate"
import {GamingPlatformNode} from "./types/GamingPlatformNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToGamingPlatformNode} from "./mapDbNodeToGamingPlatformNode"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import {escapeSingleQuotes} from "../escapeSingleQuotes"

export async function createNode(data: InputGamingPlatformCreate): Promise<GamingPlatformNode> {
    const node = await createDbNode(NodeTypeLabel.GamingPlatform, createNodeQuery(data))

    return mapDbNodeToGamingPlatformNode(node)
}

export function createNodeQuery(data: InputGamingPlatformCreate) {
    let template = getCypherQueryTemplate('nodes/gaming-platforms/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$name', `'${escapeSingleQuotes(data.name)}'`)
        .replace('$release_year', data.release_year ? `${data.release_year}` : 'null')
        .replace('$manufacturer', data.manufacturer ? `'${escapeSingleQuotes(data.manufacturer)}'` : 'null')
    return template
}
