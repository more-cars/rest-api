import {ImageNode} from "../../types/images/ImageNode"

/**
 * Based on the given "image" node this creates a response object
 * which conform to the API specification.
 */
export function marshal(image: ImageNode) {
    const responseBody = {
        id: image.id,
        external_id: image.external_id,
        image_provider: image.image_provider,
        name: image.name ?? null,
        description: image.description ?? null,
        creator: image.creator ?? null,
        license: image.license ?? null,
        tags: image.tags ?? null,
        source: image.source ?? null,
        image_url_original: image.image_url_original ?? null,
        image_url_xxl: image.image_url_xxl ?? null,
        image_url_xl: image.image_url_xl ?? null,
        image_url_l: image.image_url_l ?? null,
        image_url_m: image.image_url_m ?? null,
        image_url_s: image.image_url_s ?? null,
        image_url_xs: image.image_url_xs ?? null,
        created_at: image.created_at,
        updated_at: image.updated_at,
    }

    return responseBody
}
