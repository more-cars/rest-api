import {ImageNode} from "../../../models/images/types/ImageNode"
import {ImageResponse} from "../types/ImageResponse"

export function marshalNode(image: ImageNode) {
    const marshalledData: ImageResponse = {
        id: image.id,

        external_id: image.external_id,
        image_provider: image.image_provider,

        name: image.name,
        description: image.description ?? null,
        creator: image.creator,
        license: image.license,
        tags: image.tags ?? null,
        source: image.source,
        image_url_original: image.image_url_original,
        image_url_xxl: image.image_url_xxl ?? null,
        image_url_xl: image.image_url_xl ?? null,
        image_url_l: image.image_url_l ?? null,
        image_url_m: image.image_url_m ?? null,
        image_url_s: image.image_url_s ?? null,
        image_url_xs: image.image_url_xs ?? null,

        created_at: image.created_at,
        updated_at: image.updated_at,
    }

    return marshalledData
}
