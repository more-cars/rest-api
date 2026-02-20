import {ImageNode} from "../../../../models/node-types/images/types/ImageNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {ImageResponse} from "../types/ImageResponse"

export function marshalNode(node: ImageNode) {
    return marshalSingleNode({
        id: node.attributes.id,

        external_id: node.attributes.external_id,
        image_provider: node.attributes.image_provider,

        name: node.attributes.name,
        description: node.attributes.description ?? null,
        creator: node.attributes.creator,
        license: node.attributes.license,
        tags: node.attributes.tags ?? null,
        source: node.attributes.source,
        image_url_original: node.attributes.image_url_original,
        image_url_xxl: node.attributes.image_url_xxl ?? null,
        image_url_xl: node.attributes.image_url_xl ?? null,
        image_url_l: node.attributes.image_url_l ?? null,
        image_url_m: node.attributes.image_url_m ?? null,
        image_url_s: node.attributes.image_url_s ?? null,
        image_url_xs: node.attributes.image_url_xs ?? null,

        created_at: node.attributes.created_at,
        updated_at: node.attributes.updated_at,
    }) as ImageResponse
}
