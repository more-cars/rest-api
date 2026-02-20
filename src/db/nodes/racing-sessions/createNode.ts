import {InputRacingSessionCreate} from "./types/InputRacingSessionCreate"
import {RacingSessionNode} from "./types/RacingSessionNode"
import {createDbNode} from "../createDbNode"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToRacingSessionNode} from "./mapDbNodeToRacingSessionNode"

export async function createNode(data: InputRacingSessionCreate): Promise<RacingSessionNode> {
    const node = await createDbNode(Neo4jNodeType.RacingSession, data)

    return mapDbNodeToRacingSessionNode(node)
}
