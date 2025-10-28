import {InputSessionResultCreate} from "./types/InputSessionResultCreate"
import {SessionResultNode} from "./types/SessionResultNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToSessionResultNode} from "./mapDbNodeToSessionResultNode"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import {escapeSingleQuotes} from "../escapeSingleQuotes"

export async function createNode(data: InputSessionResultCreate): Promise<SessionResultNode> {
    const node = await createDbNode(NodeTypeLabel.SessionResult, createNodeQuery(data))

    return mapDbNodeToSessionResultNode(node)
}

export function createNodeQuery(data: InputSessionResultCreate) {
    let template = getCypherQueryTemplate('nodes/session-results/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$position', `${data.position}`)
        .replace('$race_number', data.race_number ? `'${escapeSingleQuotes(data.race_number)}'` : 'null')
        .replace('$driver_name', `'${escapeSingleQuotes(data.driver_name)}'`)
        .replace('$team_name', data.team_name ? `'${escapeSingleQuotes(data.team_name)}'` : 'null')
        .replace('$race_time', data.race_time ? `'${escapeSingleQuotes(data.race_time)}'` : 'null')
        .replace('$laps', data.laps ? `${data.laps}` : 'null')
        .replace('$status', data.status ? `'${escapeSingleQuotes(data.status)}'` : 'null')
        .replace('$points', data.points ? `${data.points}` : 'null')
    return template
}
