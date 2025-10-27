import {InputRacingSessionCreate} from "./types/InputRacingSessionCreate"
import {RacingSessionNode} from "./types/RacingSessionNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRacingSessionNode} from "./mapDbNodeToRacingSessionNode"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import {escapeSingleQuotes} from "../escapeSingleQuotes"

export async function createNode(data: InputRacingSessionCreate): Promise<RacingSessionNode> {
    const node = await createDbNode(NodeTypeLabel.RacingSession, createNodeQuery(data))

    return mapDbNodeToRacingSessionNode(node)
}

export function createNodeQuery(data: InputRacingSessionCreate) {
    let template = getCypherQueryTemplate('nodes/racing-sessions/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$name', `'${escapeSingleQuotes(data.name)}'`)
        .replace('$start_date', data.start_date ? `'${escapeSingleQuotes(data.start_date)}'` : 'null')
        .replace('$start_time', data.start_time ? `'${escapeSingleQuotes(data.start_time)}'` : 'null')
        .replace('$duration', data.duration ? `${data.duration}` : 'null')
        .replace('$duration_unit', data.duration_unit ? `'${escapeSingleQuotes(data.duration_unit)}'` : 'null')
        .replace('$distance', data.distance ? `${data.distance}` : 'null')
        .replace('$distance_unit', data.distance_unit ? `'${escapeSingleQuotes(data.distance_unit)}'` : 'null')
    return template
}
