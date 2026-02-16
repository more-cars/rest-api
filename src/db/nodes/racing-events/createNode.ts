import {InputRacingEventCreate} from "./types/InputRacingEventCreate"
import {RacingEventNode} from "./types/RacingEventNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRacingEventNode} from "./mapDbNodeToRacingEventNode"

export async function createNode(data: InputRacingEventCreate): Promise<RacingEventNode> {
    const node = await createDbNode(NodeTypeLabel.RacingEvent, data)

    return mapDbNodeToRacingEventNode(node)
}
