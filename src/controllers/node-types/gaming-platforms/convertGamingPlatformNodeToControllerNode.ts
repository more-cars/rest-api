import type {GamingPlatformNode as ModelGamingPlatformNode} from "../../../models/node-types/gaming-platforms/types/GamingPlatformNode"
import type {GamingPlatformNode} from "./types/GamingPlatformNode"
import {ControllerNodeType} from "../../nodes/types/ControllerNodeType"

export function convertGamingPlatformNodeToControllerNode(modelNode: ModelGamingPlatformNode): GamingPlatformNode {
    return {
        node_type: ControllerNodeType.GamingPlatform,
        fields: {
            id: modelNode.attributes.id,
            name: modelNode.attributes.name,
            release_year: modelNode.attributes.release_year ?? null,
            manufacturer: modelNode.attributes.manufacturer ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies GamingPlatformNode
}
