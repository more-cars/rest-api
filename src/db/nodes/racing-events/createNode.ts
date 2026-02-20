import {InputRacingEventCreate} from "./types/InputRacingEventCreate"
import {RacingEventNode} from "./types/RacingEventNode"
import {createDbNode} from "../createDbNode"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToRacingEventNode} from "./mapDbNodeToRacingEventNode"

export async function createNode(data: InputRacingEventCreate): Promise<RacingEventNode> {
    const node = await createDbNode(Neo4jNodeType.RacingEvent, data)

    return mapDbNodeToRacingEventNode(node)
}
