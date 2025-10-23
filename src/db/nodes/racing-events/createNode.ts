import {InputRacingEventCreate} from "./types/InputRacingEventCreate"
import {RacingEventNode} from "./types/RacingEventNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRacingEventNode} from "./mapDbNodeToRacingEventNode"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import {escapeSingleQuotes} from "../escapeSingleQuotes"

export async function createNode(data: InputRacingEventCreate): Promise<RacingEventNode> {
    const node = await createDbNode(NodeTypeLabel.RacingEvent, createNodeQuery(data))

    return mapDbNodeToRacingEventNode(node)
}

export function createNodeQuery(data: InputRacingEventCreate) {
    let template = getCypherQueryTemplate('nodes/racing-events/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$name', `'${escapeSingleQuotes(data.name)}'`)
        .replace('$round', data.round ? `${data.round}` : 'null')
        .replace('$date_from', data.date_from ? `'${escapeSingleQuotes(data.date_from)}'` : 'null')
        .replace('$date_to', data.date_to ? `'${escapeSingleQuotes(data.date_to)}'` : 'null')
    return template
}
