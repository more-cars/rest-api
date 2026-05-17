import type {VideoInput} from "../types/VideoInput"
import type {VideoInputExternal} from "./VideoInputExternal"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: VideoInput & VideoInputExternal): DbInputData {
    return {
        video_provider: data.video_provider,
        external_id: data.external_id,
        title: data.title,
        description: data.description,
        creator: data.creator,
        license: data.license,
        tags: data.tags,
        source: data.source,
        duration: data.duration,
        thumbnail_url_l: data.thumbnail_url_l,
        thumbnail_url_m: data.thumbnail_url_m,
        thumbnail_url_s: data.thumbnail_url_s,
        thumbnail_url_xs: data.thumbnail_url_xs,
    }
}
