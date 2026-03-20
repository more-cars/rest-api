import {ModelCarBrandNode} from "./types/ModelCarBrandNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return node as ModelCarBrandNode
}
