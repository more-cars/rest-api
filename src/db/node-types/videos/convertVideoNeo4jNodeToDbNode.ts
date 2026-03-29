import {Node} from "neo4j-driver"
import {VideoNode} from "./types/VideoNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertVideoNeo4jNodeToDbNode(neo4jNode: Node): VideoNode {
    return {
        node_type: DbNodeType.Video,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,
    
            // user data
            video_provider: neo4jNode.properties.video_provider,
            external_id: neo4jNode.properties.external_id,
            title: neo4jNode.properties.title,
            description: neo4jNode.properties.description,
            creator: neo4jNode.properties.creator,
            license: neo4jNode.properties.license,
            tags: neo4jNode.properties.tags,
            source: neo4jNode.properties.source,
            duration: neo4jNode.properties.duration,
            thumbnail_url_l: neo4jNode.properties.thumbnail_url_l,
            thumbnail_url_m: neo4jNode.properties.thumbnail_url_m,
            thumbnail_url_s: neo4jNode.properties.thumbnail_url_s,
            thumbnail_url_xs: neo4jNode.properties.thumbnail_url_xs,
        },
    } satisfies VideoNode
}
