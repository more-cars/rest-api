import {InputRacingSessionCreate} from "./types/InputRacingSessionCreate"
import {RacingSessionNode} from "./types/RacingSessionNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToRacingSessionNode} from "./mapDbNodeToRacingSessionNode"

export async function createNode(data: InputRacingSessionCreate): Promise<RacingSessionNode> {
    const node = await createNeo4jNode(DbNodeType.RacingSession, data)

    return mapDbNodeToRacingSessionNode(node)
}
