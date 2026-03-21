import {ModelCarNode} from "./types/ModelCarNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.ModelCar)

    if (!node) {
        return false
    }

    return node as ModelCarNode
}
