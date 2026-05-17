import type {YouTubeVideoItem} from "./types/YouTubeVideoItem"
import type {VideoInputExternal} from "../../../models/node-types/videos/create/VideoInputExternal"

export function convertYouTubeVideoItemToVideoInput(data: YouTubeVideoItem): VideoInputExternal {
    return {
        title: data.snippet.title,
        description: data.snippet.description,
        creator: data.snippet.channelTitle,
        license: data.status.license === 'creativeCommon' ? 'cc by' : 'youtube',
        tags: data.snippet.tags ? data.snippet.tags.join(',') : null,
        source: "https://www.youtube.com/watch?v=" + data.id,
        duration: data.contentDetails.duration,
        thumbnail_url_l: data.snippet.thumbnails.standard.url,
        thumbnail_url_m: data.snippet.thumbnails.high.url,
        thumbnail_url_s: data.snippet.thumbnails.medium.url,
        thumbnail_url_xs: data.snippet.thumbnails.default.url,
    }
}
