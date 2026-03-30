import type {YouTubeVideoItem} from "./types/YouTubeVideoItem"
import type {CreateYouTubeVideoInput} from "../../../models/node-types/videos/create/CreateYouTubeVideoInput"

export function convertYouTubeVideoItemToVideoInput(data: YouTubeVideoItem): CreateYouTubeVideoInput {
    return {
        title: data.snippet.title,
        description: data.snippet.description,
        creator: data.snippet.channelTitle,
        license: data.status.license === 'creativeCommon' ? 'cc by' : 'youtube',
        tags: data.snippet.tags.join(','),
        source: "https://www.youtube.com/watch?v=" + data.id,
        duration: data.contentDetails.duration,
        thumbnail_url_l: data.snippet.thumbnails.standard.url,
        thumbnail_url_m: data.snippet.thumbnails.high.url,
        thumbnail_url_s: data.snippet.thumbnails.medium.url,
        thumbnail_url_xs: data.snippet.thumbnails.default.url,
    }
}
