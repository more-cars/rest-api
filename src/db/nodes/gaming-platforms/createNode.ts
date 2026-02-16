import {InputGamingPlatformCreate} from "./types/InputGamingPlatformCreate"
import {GamingPlatformNode} from "./types/GamingPlatformNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToGamingPlatformNode} from "./mapDbNodeToGamingPlatformNode"

export async function createNode(data: InputGamingPlatformCreate): Promise<GamingPlatformNode> {
    const node = await createDbNode(NodeTypeLabel.GamingPlatform, data)

    return mapDbNodeToGamingPlatformNode(node)
}
