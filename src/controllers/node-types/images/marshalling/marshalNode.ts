import {ImageNode} from "../../../../models/images/types/ImageNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {ImageResponse} from "../types/ImageResponse"

export function marshalNode(node: ImageNode) {
    return marshalSingleNode({
        id: node.id,

        external_id: node.external_id,
        image_provider: node.image_provider,

        name: node.name,
        description: node.description ?? null,
        creator: node.creator,
        license: node.license,
        tags: node.tags ?? null,
        source: node.source,
        image_url_original: node.image_url_original,
        image_url_xxl: node.image_url_xxl ?? null,
        image_url_xl: node.image_url_xl ?? null,
        image_url_l: node.image_url_l ?? null,
        image_url_m: node.image_url_m ?? null,
        image_url_s: node.image_url_s ?? null,
        image_url_xs: node.image_url_xs ?? null,

        created_at: node.created_at,
        updated_at: node.updated_at,
    }) as ImageResponse
}
