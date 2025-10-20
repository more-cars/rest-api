import {InputRaceTrackCreate} from "./types/InputRaceTrackCreate"
import {RaceTrackNode} from "./types/RaceTrackNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRaceTrackNode} from "./mapDbNodeToRaceTrackNode"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import {escapeSingleQuotes} from "../escapeSingleQuotes"

export async function createNode(data: InputRaceTrackCreate): Promise<RaceTrackNode> {
    const node = await createDbNode(NodeTypeLabel.RaceTrack, createNodeQuery(data))

    return mapDbNodeToRaceTrackNode(node)
}

export function createNodeQuery(data: InputRaceTrackCreate) {
    let template = getCypherQueryTemplate('nodes/race-tracks/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$name', `'${escapeSingleQuotes(data.name)}'`)
        .replace('$opened', data.opened ? `${data.opened}` : 'null')
        .replace('$closed', data.closed ? `${data.closed}` : 'null')
        .replace('$type', data.type ? `'${escapeSingleQuotes(data.type)}'` : 'null')
        .replace('$location', data.location ? `'${escapeSingleQuotes(data.location)}'` : 'null')
        .replace('$geo_position', data.geo_position ? `'${escapeSingleQuotes(data.geo_position)}'` : 'null')
    return template
}
