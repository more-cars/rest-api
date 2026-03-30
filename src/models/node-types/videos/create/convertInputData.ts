import type {CreateVideoInput} from "../types/CreateVideoInput"
import type {CreateYouTubeVideoInput} from "./CreateYouTubeVideoInput"
import type {InputVideoCreate} from "../../../../db/node-types/videos/types/InputVideoCreate"

export function convertInputData(data: CreateVideoInput & CreateYouTubeVideoInput): InputVideoCreate {
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
    } satisfies InputVideoCreate
}
