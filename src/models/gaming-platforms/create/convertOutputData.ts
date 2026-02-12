import {GamingPlatformNode as GamingPlatformNodeInput} from "../../../db/nodes/gaming-platforms/types/GamingPlatformNode"
import {GamingPlatformNode} from "../types/GamingPlatformNode"

export function convertOutputData(data: GamingPlatformNodeInput): GamingPlatformNode {
    return {
        id: data.id,
        name: data.name,
        release_year: data.release_year,
        manufacturer: data.manufacturer,
        created_at: data.created_at,
        updated_at: data.updated_at,
    } as GamingPlatformNode
}
