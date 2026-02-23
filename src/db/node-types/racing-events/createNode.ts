import {InputRacingEventCreate} from "./types/InputRacingEventCreate"
import {RacingEventNode} from "./types/RacingEventNode"
import {createDbNode} from "../../nodes/createDbNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToRacingEventNode} from "./mapDbNodeToRacingEventNode"

export async function createNode(data: InputRacingEventCreate): Promise<RacingEventNode> {
    const node = await createDbNode(DbNodeType.RacingEvent, data)

    return mapDbNodeToRacingEventNode(node)
}
