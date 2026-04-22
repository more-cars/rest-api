import {InputRacingEventCreate} from "./types/InputRacingEventCreate"
import {RacingEventNode} from "./types/RacingEventNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputRacingEventCreate): Promise<RacingEventNode> {
    return await createNeo4jNode(DbNodeType.RacingEvent, data) as RacingEventNode
}
