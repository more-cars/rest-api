import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type VideoNode = {
    node_type: ControllerNodeType.Video
    fields: {
        id: number
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
        created_at: string
        updated_at: string
    }
}
