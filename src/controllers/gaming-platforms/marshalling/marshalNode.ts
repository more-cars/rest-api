import {GamingPlatformNode} from "../../../models/gaming-platforms/types/GamingPlatformNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {GamingPlatformResponse} from "../types/GamingPlatformResponse"

export function marshalNode(node: GamingPlatformNode) {
    return marshalSingleNode({
        id: node.id,
        name: node.name,
        release_year: node.release_year ?? null,
        manufacturer: node.manufacturer ?? null,
        created_at: node.created_at,
        updated_at: node.updated_at,
    }) as GamingPlatformResponse
}
