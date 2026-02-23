import {GamingPlatformNode as DbGamingPlatformNode} from "../../../../db/node-types/gaming-platforms/types/GamingPlatformNode"
import {GamingPlatformNode} from "../types/GamingPlatformNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertGamingPlatformDbNodeToModelNode(data: DbGamingPlatformNode): GamingPlatformNode {
    return {
        node_type: ModelNodeType.GamingPlatform,
        attributes: {
            id: data.properties.id,
            name: data.properties.name,
            release_year: data.properties.release_year,
            manufacturer: data.properties.manufacturer,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies GamingPlatformNode
}
