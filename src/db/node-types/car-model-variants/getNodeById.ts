import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.CarModelVariant)

    if (!node) {
        return false
    }

    return node as CarModelVariantNode
}
