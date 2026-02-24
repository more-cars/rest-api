import {Node} from "neo4j-driver"
import {GamingPlatformNode} from "./types/GamingPlatformNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertGamingPlatformNeo4jNodeToDbNode(neo4jNode: Node): GamingPlatformNode {
    return {
        node_type: DbNodeType.GamingPlatform,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,

            // user data
            name: neo4jNode.properties.name,
            release_year: neo4jNode.properties.release_year,
            manufacturer: neo4jNode.properties.manufacturer,
        },
    } satisfies GamingPlatformNode
}
