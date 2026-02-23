import {Node} from "neo4j-driver"
import {ImageNode} from "./types/ImageNode"
import {DbNodeType} from "../../types/DbNodeType"

export function mapDbNodeToImageNode(neo4jNode: Node): ImageNode {
    return {
        node_type: DbNodeType.Image,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,

            // user data
            external_id: neo4jNode.properties.external_id,
            image_provider: neo4jNode.properties.image_provider,

            // generated data
            name: neo4jNode.properties.name,
            description: neo4jNode.properties.description,
            creator: neo4jNode.properties.creator,
            license: neo4jNode.properties.license,
            tags: neo4jNode.properties.tags,
            source: neo4jNode.properties.source,
            image_url_original: neo4jNode.properties.image_url_original,
            image_url_xxl: neo4jNode.properties.image_url_xxl,
            image_url_xl: neo4jNode.properties.image_url_xl,
            image_url_l: neo4jNode.properties.image_url_l,
            image_url_m: neo4jNode.properties.image_url_m,
            image_url_s: neo4jNode.properties.image_url_s,
            image_url_xs: neo4jNode.properties.image_url_xs,
        },
    } satisfies ImageNode
}
