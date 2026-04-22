import {InputLapTimeCreate} from "./types/InputLapTimeCreate"
import {LapTimeNode} from "./types/LapTimeNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputLapTimeCreate): Promise<LapTimeNode> {
    return await createNeo4jNode(DbNodeType.LapTime, data) as LapTimeNode
}
