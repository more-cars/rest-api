import {getApiKey} from "./getApiKey"
import {performYouTubeApiRequest} from "./performYouTubeApiRequest"
import type {YouTubeVideoItem} from "./types/YouTubeVideoItem"
import {convertYouTubeVideoItemToVideoInput} from "./convertYouTubeVideoItemToVideoInput"
import {getBaseUrl} from "./getBaseUrl"

export async function getVideoById(id: string) {
    const url = getVideoByIdRequestUrl(id, getApiKey())
    const response = await performYouTubeApiRequest(url)
    const youtubeVideo = response.items[0] as YouTubeVideoItem

    return convertYouTubeVideoItemToVideoInput(youtubeVideo)
}

export function getVideoByIdRequestUrl(videoId: string, apiKey: string) {
    return `${getBaseUrl()}?key=${apiKey}&part=snippet,contentDetails,status&id=${videoId}`
}

