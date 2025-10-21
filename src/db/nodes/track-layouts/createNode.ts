import {InputTrackLayoutCreate} from "./types/InputTrackLayoutCreate"
import {TrackLayoutNode} from "./types/TrackLayoutNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToTrackLayoutNode} from "./mapDbNodeToTrackLayoutNode"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import {escapeSingleQuotes} from "../escapeSingleQuotes"

export async function createNode(data: InputTrackLayoutCreate): Promise<TrackLayoutNode> {
    const node = await createDbNode(NodeTypeLabel.TrackLayout, createNodeQuery(data))

    return mapDbNodeToTrackLayoutNode(node)
}

export function createNodeQuery(data: InputTrackLayoutCreate) {
    let template = getCypherQueryTemplate('nodes/track-layouts/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$name', `'${escapeSingleQuotes(data.name)}'`)
        .replace('$year_from', data.year_from ? `${data.year_from}` : 'null')
        .replace('$year_to', data.year_to ? `${data.year_to}` : 'null')
        .replace('$length', data.length ? `${data.length}` : 'null')
        .replace('$length_unit', data.length_unit ? `'${escapeSingleQuotes(data.length_unit)}'` : 'null')
        .replace('$direction', data.direction ? `'${escapeSingleQuotes(data.direction)}'` : 'null')
        .replace('$elevation_change', data.elevation_change ? `${data.elevation_change}` : 'null')
        .replace('$elevation_change_unit', data.elevation_change_unit ? `'${escapeSingleQuotes(data.elevation_change_unit)}'` : 'null')
        .replace('$surface', data.surface ? `'${escapeSingleQuotes(data.surface)}'` : 'null')
    return template
}
