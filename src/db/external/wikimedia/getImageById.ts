import {performWikimediaApiRequest} from "./performWikimediaApiRequest"
import type {WikimediaImageItem} from "./types/WikimediaImageItem"
import {convertWikimediaImageItemToImageInput} from "./convertWikimediaImageItemToImageInput"
import {getBaseUrl} from "./getBaseUrl"

export async function getImageById(id: string) {
    const thumbnailSize = 120
    const url = getImageByIdRequestUrl(id, thumbnailSize)
    const response = await performWikimediaApiRequest(url)
    const pageId = response.query.pageids[0]
    const wikimediaImage = response.query.pages[pageId].imageinfo[0] as WikimediaImageItem

    return convertWikimediaImageItemToImageInput(wikimediaImage, thumbnailSize)
}

export function getImageByIdRequestUrl(imageId: string, thumbnailSize: number) {
    return `${getBaseUrl()}?action=query&format=json&indexpageids&iiurlparam=${thumbnailSize}px&prop=imageinfo&iiprop=url|mediatype|user|size|extmetadata&titles=File:${imageId}`
}
