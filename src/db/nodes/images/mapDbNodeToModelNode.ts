import {ImageNode} from "../../../types/images/ImageNode"
import {Node} from "neo4j-driver"

export function mapDbNodeToModelNode(dbNode: Node): ImageNode {
    const modelNode: ImageNode = {
        // system data
        id: dbNode.properties.mc_id,
        created_at: dbNode.properties.created_at,
        updated_at: dbNode.properties.updated_at,

        // user data
        external_id: dbNode.properties.external_id,
        image_provider: dbNode.properties.image_provider,

        // generated data
        name: dbNode.properties.name,
        description: dbNode.properties.description,
        creator: dbNode.properties.creator,
        license: dbNode.properties.license,
        tags: dbNode.properties.tags,
        source: dbNode.properties.source,
        image_url_original: dbNode.properties.image_url_original,
        image_url_xxl: dbNode.properties.image_url_xxl,
        image_url_xl: dbNode.properties.image_url_xl,
        image_url_l: dbNode.properties.image_url_l,
        image_url_m: dbNode.properties.image_url_m,
        image_url_s: dbNode.properties.image_url_s,
        image_url_xs: dbNode.properties.image_url_xs,
    }

    return modelNode
}
