import {DbNodeType} from "../../../types/DbNodeType"

export type VideoNode = {
    node_type: DbNodeType.Video,
    properties: {
        id: number
        created_at: string
        updated_at: string
        video_provider: string
        external_id: string
        title: string | null
        description: string | null
        creator: string | null
        license: string | null
        tags: string | null
        source: string | null
        duration: string | null
        thumbnail_url_l: string | null
        thumbnail_url_m: string | null
        thumbnail_url_s: string | null
        thumbnail_url_xs: string | null
    }
}
