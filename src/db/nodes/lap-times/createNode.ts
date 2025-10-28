import {InputLapTimeCreate} from "./types/InputLapTimeCreate"
import {LapTimeNode} from "./types/LapTimeNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToLapTimeNode} from "./mapDbNodeToLapTimeNode"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import {escapeSingleQuotes} from "../escapeSingleQuotes"

export async function createNode(data: InputLapTimeCreate): Promise<LapTimeNode> {
    const node = await createDbNode(NodeTypeLabel.LapTime, createNodeQuery(data))

    return mapDbNodeToLapTimeNode(node)
}

export function createNodeQuery(data: InputLapTimeCreate) {
    let template = getCypherQueryTemplate('nodes/lap-times/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$time', `'${escapeSingleQuotes(data.time)}'`)
        .replace('$driver_name', `'${escapeSingleQuotes(data.driver_name)}'`)
        .replace('$date', data.date ? `'${escapeSingleQuotes(data.date)}'` : 'null')
    return template
}
