import {InputRacingSessionCreate} from "./types/InputRacingSessionCreate"
import {RacingSessionNode} from "./types/RacingSessionNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputRacingSessionCreate): Promise<RacingSessionNode> {
    return await createNeo4jNode(DbNodeType.RacingSession, data) as RacingSessionNode
}
