import {InputRacingSessionCreate} from "./types/InputRacingSessionCreate"
import {RacingSessionNode} from "./types/RacingSessionNode"
import {createDbNode} from "../createDbNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToRacingSessionNode} from "./mapDbNodeToRacingSessionNode"

export async function createNode(data: InputRacingSessionCreate): Promise<RacingSessionNode> {
    const node = await createDbNode(DbNodeType.RacingSession, data)

    return mapDbNodeToRacingSessionNode(node)
}
