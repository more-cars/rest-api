import {InputGamingPlatformCreate} from "./types/InputGamingPlatformCreate"
import {GamingPlatformNode} from "./types/GamingPlatformNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputGamingPlatformCreate): Promise<GamingPlatformNode> {
    return await createNeo4jNode(DbNodeType.GamingPlatform, data) as GamingPlatformNode
}
