import {MotorShowNode} from "./types/MotorShowNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.MotorShow)

    if (!node) {
        return false
    }

    return node as MotorShowNode
}
