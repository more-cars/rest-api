import {GamingPlatformNode} from "../../../../models/node-types/gaming-platforms/types/GamingPlatformNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {GamingPlatformResponse} from "../types/GamingPlatformResponse"

export function marshalNode(node: GamingPlatformNode) {
    return marshalSingleNode({
        id: node.attributes.id,
        name: node.attributes.name,
        release_year: node.attributes.release_year ?? null,
        manufacturer: node.attributes.manufacturer ?? null,
        created_at: node.attributes.created_at,
        updated_at: node.attributes.updated_at,
    }) as GamingPlatformResponse
}
