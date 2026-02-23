import {ImageNode as DbImageNode} from "../../../../db/node-types/images/types/ImageNode"
import {ImageNode} from "../types/ImageNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertImageDbNodeToModelNode(data: DbImageNode): ImageNode {
    return {
        node_type: ModelNodeType.Image,
        attributes: {
            id: data.properties.id,
            image_provider: data.properties.image_provider,
            external_id: data.properties.external_id,
            name: data.properties.name,
            description: data.properties.description,
            creator: data.properties.creator,
            license: data.properties.license,
            tags: data.properties.tags,
            source: data.properties.source,
            image_url_original: data.properties.image_url_original,
            image_url_xxl: data.properties.image_url_xxl,
            image_url_xl: data.properties.image_url_xl,
            image_url_l: data.properties.image_url_l,
            image_url_m: data.properties.image_url_m,
            image_url_s: data.properties.image_url_s,
            image_url_xs: data.properties.image_url_xs,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies ImageNode
}
