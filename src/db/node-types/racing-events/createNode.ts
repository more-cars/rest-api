import {InputRacingEventCreate} from "./types/InputRacingEventCreate"
import {RacingEventNode} from "./types/RacingEventNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertRacingEventNeo4jNodeToDbNode} from "./convertRacingEventNeo4jNodeToDbNode"

export async function createNode(data: InputRacingEventCreate): Promise<RacingEventNode> {
    const node = await createNeo4jNode(DbNodeType.RacingEvent, data)

    return convertRacingEventNeo4jNodeToDbNode(node)
}
