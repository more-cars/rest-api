import {VideoNode as VideoNodeInput} from "../../../../db/node-types/videos/types/VideoNode"
import {VideoNode} from "../types/VideoNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertVideoDbNodeToModelNode(data: VideoNodeInput): VideoNode {
    return {
        node_type: ModelNodeType.Video,
        attributes: {
            id: data.properties.id,
            video_provider: data.properties.video_provider,
            external_id: data.properties.external_id,
            title: data.properties.title,
            description: data.properties.description,
            creator: data.properties.creator,
            license: data.properties.license,
            tags: data.properties.tags,
            source: data.properties.source,
            duration: data.properties.duration,
            thumbnail_url_l: data.properties.thumbnail_url_l,
            thumbnail_url_m: data.properties.thumbnail_url_m,
            thumbnail_url_s: data.properties.thumbnail_url_s,
            thumbnail_url_xs: data.properties.thumbnail_url_xs,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies VideoNode
}
