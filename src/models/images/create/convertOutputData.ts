import {ImageNode as ImageNodeInput} from "../../../db/nodes/images/types/ImageNode"
import {ImageNode as ImageNodeOutput} from "../types/ImageNode"

export function convertOutputData(data: ImageNodeInput): ImageNodeOutput {
    const convertedData: ImageNodeOutput = {
        id: data.id,
        image_provider: data.image_provider,
        external_id: data.external_id,
        name: data.name,
        description: data.description,
        creator: data.creator,
        license: data.license,
        tags: data.tags,
        source: data.source,
        image_url_original: data.image_url_original,
        image_url_xxl: data.image_url_xxl,
        image_url_xl: data.image_url_xl,
        image_url_l: data.image_url_l,
        image_url_m: data.image_url_m,
        image_url_s: data.image_url_s,
        image_url_xs: data.image_url_xs,
        created_at: data.created_at,
        updated_at: data.updated_at,
    }

    return convertedData
}
