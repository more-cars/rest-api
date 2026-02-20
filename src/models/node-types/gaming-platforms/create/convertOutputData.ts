import {GamingPlatformNode as GamingPlatformNodeInput} from "../../../../db/nodes/gaming-platforms/types/GamingPlatformNode"
import {GamingPlatformNode} from "../types/GamingPlatformNode"

export function convertOutputData(data: GamingPlatformNodeInput): GamingPlatformNode {
    return {
        id: data.properties.id,
        name: data.properties.name,
        release_year: data.properties.release_year,
        manufacturer: data.properties.manufacturer,
        created_at: data.properties.created_at,
        updated_at: data.properties.updated_at,
    } as GamingPlatformNode
}
