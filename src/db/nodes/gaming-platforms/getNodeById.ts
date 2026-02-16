import {GamingPlatformNode} from "./types/GamingPlatformNode"
import {fetchNodeById} from "../fetchNodeById"
import {mapDbNodeToGamingPlatformNode} from "./mapDbNodeToGamingPlatformNode"

export async function getNodeById(id: number): Promise<false | GamingPlatformNode> {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return mapDbNodeToGamingPlatformNode(node)
}
