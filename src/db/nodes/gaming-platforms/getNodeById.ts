import {GamingPlatformNode} from "./types/GamingPlatformNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {mapDbNodeToGamingPlatformNode} from "./mapDbNodeToGamingPlatformNode"

export async function getNodeById(id: number): Promise<false | GamingPlatformNode> {
    const node = await fetchNodeFromDb(id)

    if (!node) {
        return false
    }

    return mapDbNodeToGamingPlatformNode(node)
}
