import {CarModelNode} from "./types/CarModelNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return node as CarModelNode
}
