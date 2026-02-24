import {InputGamingPlatformCreate} from "./types/InputGamingPlatformCreate"
import {GamingPlatformNode} from "./types/GamingPlatformNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToGamingPlatformNode} from "./mapDbNodeToGamingPlatformNode"

export async function createNode(data: InputGamingPlatformCreate): Promise<GamingPlatformNode> {
    const node = await createNeo4jNode(DbNodeType.GamingPlatform, data)

    return mapDbNodeToGamingPlatformNode(node)
}
