import {Node} from "neo4j-driver"
import {GamingPlatformNode} from "./types/GamingPlatformNode"

export function mapDbNodeToGamingPlatformNode(dbNode: Node): GamingPlatformNode {
    return {
        // system data
        id: dbNode.properties.mc_id,
        created_at: dbNode.properties.created_at,
        updated_at: dbNode.properties.updated_at,

        // user data
        name: dbNode.properties.name,
        release_year: dbNode.properties.release_year,
        manufacturer: dbNode.properties.manufacturer,
    } as GamingPlatformNode
}
