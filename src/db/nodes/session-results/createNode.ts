import {InputSessionResultCreate} from "./types/InputSessionResultCreate"
import {SessionResultNode} from "./types/SessionResultNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToSessionResultNode} from "./mapDbNodeToSessionResultNode"

export async function createNode(data: InputSessionResultCreate): Promise<SessionResultNode> {
    const node = await createDbNode(NodeTypeLabel.SessionResult, data)

    return mapDbNodeToSessionResultNode(node)
}
