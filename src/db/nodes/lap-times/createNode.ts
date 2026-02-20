import {InputLapTimeCreate} from "./types/InputLapTimeCreate"
import {LapTimeNode} from "./types/LapTimeNode"
import {createDbNode} from "../createDbNode"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToLapTimeNode} from "./mapDbNodeToLapTimeNode"

export async function createNode(data: InputLapTimeCreate): Promise<LapTimeNode> {
    const node = await createDbNode(Neo4jNodeType.LapTime, data)

    return mapDbNodeToLapTimeNode(node)
}
