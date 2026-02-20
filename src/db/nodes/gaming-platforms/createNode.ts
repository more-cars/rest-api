import {InputGamingPlatformCreate} from "./types/InputGamingPlatformCreate"
import {GamingPlatformNode} from "./types/GamingPlatformNode"
import {createDbNode} from "../createDbNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToGamingPlatformNode} from "./mapDbNodeToGamingPlatformNode"

export async function createNode(data: InputGamingPlatformCreate): Promise<GamingPlatformNode> {
    const node = await createDbNode(DbNodeType.GamingPlatform, data)

    return mapDbNodeToGamingPlatformNode(node)
}
