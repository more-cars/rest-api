import {GamingPlatformNode} from "./types/GamingPlatformNode"
import {fetchNodeById} from "../fetchNodeById"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return node as GamingPlatformNode
}
