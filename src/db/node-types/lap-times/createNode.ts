import {InputLapTimeCreate} from "./types/InputLapTimeCreate"
import {LapTimeNode} from "./types/LapTimeNode"
import {createDbNode} from "../../nodes/createDbNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToLapTimeNode} from "./mapDbNodeToLapTimeNode"

export async function createNode(data: InputLapTimeCreate): Promise<LapTimeNode> {
    const node = await createDbNode(DbNodeType.LapTime, data)

    return mapDbNodeToLapTimeNode(node)
}
