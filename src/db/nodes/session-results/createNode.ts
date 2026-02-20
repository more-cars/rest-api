import {InputSessionResultCreate} from "./types/InputSessionResultCreate"
import {SessionResultNode} from "./types/SessionResultNode"
import {createDbNode} from "../createDbNode"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToSessionResultNode} from "./mapDbNodeToSessionResultNode"

export async function createNode(data: InputSessionResultCreate): Promise<SessionResultNode> {
    const node = await createDbNode(Neo4jNodeType.SessionResult, data)

    return mapDbNodeToSessionResultNode(node)
}
