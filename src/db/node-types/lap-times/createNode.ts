import {InputLapTimeCreate} from "./types/InputLapTimeCreate"
import {LapTimeNode} from "./types/LapTimeNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertLapTimeNeo4jNodeToDbNode} from "./convertLapTimeNeo4jNodeToDbNode"

export async function createNode(data: InputLapTimeCreate): Promise<LapTimeNode> {
    const node = await createNeo4jNode(DbNodeType.LapTime, data)

    return convertLapTimeNeo4jNodeToDbNode(node)
}
