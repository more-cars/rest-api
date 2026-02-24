import {InputLapTimeCreate} from "./types/InputLapTimeCreate"
import {LapTimeNode} from "./types/LapTimeNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToLapTimeNode} from "./mapDbNodeToLapTimeNode"

export async function createNode(data: InputLapTimeCreate): Promise<LapTimeNode> {
    const node = await createNeo4jNode(DbNodeType.LapTime, data)

    return mapDbNodeToLapTimeNode(node)
}
