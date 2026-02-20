import {InputGamingPlatformCreate} from "./types/InputGamingPlatformCreate"
import {GamingPlatformNode} from "./types/GamingPlatformNode"
import {createDbNode} from "../createDbNode"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToGamingPlatformNode} from "./mapDbNodeToGamingPlatformNode"

export async function createNode(data: InputGamingPlatformCreate): Promise<GamingPlatformNode> {
    const node = await createDbNode(Neo4jNodeType.GamingPlatform, data)

    return mapDbNodeToGamingPlatformNode(node)
}
