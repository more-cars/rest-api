import {getApiKey} from "./getApiKey"
import {performFlickrApiRequest} from "./performFlickrApiRequest"
import {convertFlickrImageItemToImageInput} from "./convertFlickrImageItemToImageInput"
import {getBaseUrl} from "./getBaseUrl"

export async function getImageById(id: string) {
    const photoRequestUrl = getImageByIdRequestUrl(id, getApiKey())
    const photoResponse = await performFlickrApiRequest(photoRequestUrl)
    const thumbnailsRequestUrl = getThumbnailsRequestUrl(id, getApiKey())
    const thumbnailResponse = await performFlickrApiRequest(thumbnailsRequestUrl)

    return convertFlickrImageItemToImageInput(photoResponse.photo, thumbnailResponse.sizes.size)
}

export function getImageByIdRequestUrl(imageId: string, apiKey: string) {
    return `${getBaseUrl()}?api_key=${apiKey}&format=json&nojsoncallback=1&method=flickr.photos.getInfo&photo_id=${imageId}`
}

export function getThumbnailsRequestUrl(imageId: string, apiKey: string) {
    return `${getBaseUrl()}?api_key=${apiKey}&format=json&nojsoncallback=1&method=flickr.photos.getSizes&photo_id=${imageId}`
}
