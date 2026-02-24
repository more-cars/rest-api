import {InputRacingSessionCreate} from "./types/InputRacingSessionCreate"
import {RacingSessionNode} from "./types/RacingSessionNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertRacingSessionNeo4jNodeToDbNode} from "./convertRacingSessionNeo4jNodeToDbNode"

export async function createNode(data: InputRacingSessionCreate): Promise<RacingSessionNode> {
    const node = await createNeo4jNode(DbNodeType.RacingSession, data)

    return convertRacingSessionNeo4jNodeToDbNode(node)
}
