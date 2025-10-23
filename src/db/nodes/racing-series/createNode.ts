import {InputRacingSeriesCreate} from "./types/InputRacingSeriesCreate"
import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRacingSeriesNode} from "./mapDbNodeToRacingSeriesNode"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import {escapeSingleQuotes} from "../escapeSingleQuotes"

export async function createNode(data: InputRacingSeriesCreate): Promise<RacingSeriesNode> {
    const node = await createDbNode(NodeTypeLabel.RacingSeries, createNodeQuery(data))

    return mapDbNodeToRacingSeriesNode(node)
}

export function createNodeQuery(data: InputRacingSeriesCreate) {
    let template = getCypherQueryTemplate('nodes/racing-series/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$name', `'${escapeSingleQuotes(data.name)}'`)
        .replace('$short_name', data.short_name ? `'${escapeSingleQuotes(data.short_name)}'` : 'null')
        .replace('$founded', data.founded ? `${data.founded}` : 'null')
        .replace('$defunct', data.defunct ? `${data.defunct}` : 'null')
        .replace('$organized_by', data.organized_by ? `'${escapeSingleQuotes(data.organized_by)}'` : 'null')
        .replace('$vehicle_type', data.vehicle_type ? `'${escapeSingleQuotes(data.vehicle_type)}'` : 'null')
    return template
}
