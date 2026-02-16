import {InputLapTimeCreate} from "./types/InputLapTimeCreate"
import {LapTimeNode} from "./types/LapTimeNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToLapTimeNode} from "./mapDbNodeToLapTimeNode"

export async function createNode(data: InputLapTimeCreate): Promise<LapTimeNode> {
    const node = await createDbNode(NodeTypeLabel.LapTime, data)

    return mapDbNodeToLapTimeNode(node)
}
