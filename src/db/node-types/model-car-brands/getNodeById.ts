import {ModelCarBrandNode} from "./types/ModelCarBrandNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.ModelCarBrand)

    if (!node) {
        return false
    }

    return node as ModelCarBrandNode
}
