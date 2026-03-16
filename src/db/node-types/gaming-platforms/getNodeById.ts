import {GamingPlatformNode} from "./types/GamingPlatformNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.GamingPlatform)

    if (!node) {
        return false
    }

    return node as GamingPlatformNode
}
