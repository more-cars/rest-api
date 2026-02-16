import {InputRacingSessionCreate} from "./types/InputRacingSessionCreate"
import {RacingSessionNode} from "./types/RacingSessionNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRacingSessionNode} from "./mapDbNodeToRacingSessionNode"

export async function createNode(data: InputRacingSessionCreate): Promise<RacingSessionNode> {
    const node = await createDbNode(NodeTypeLabel.RacingSession, data)

    return mapDbNodeToRacingSessionNode(node)
}
