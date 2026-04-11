import type {FlickrImageItem} from "./types/FlickrImageItem"
import type {FlickrThumbnailItem} from "./types/FlickrThumbnailItem"
import type {CreateExternalImageInput} from "../../../models/node-types/images/create/CreateExternalImageInput"

export function convertFlickrImageItemToImageInput(data: FlickrImageItem, thumbnails: FlickrThumbnailItem[]): CreateExternalImageInput {
    return {
        name: data.title._content,
        description: data.description._content,
        creator: data.owner.username || data.owner.realname,
        license: convertLicense(data.license) || 'UNKNOWN',
        tags: data.tags.tag.map(tag => tag.raw).join(','),
        source: data.urls.url[0]._content,
        image_url_original: thumbnails.find(thumbnail => thumbnail.label === 'Original')?.url || 'UNKNOWN',
        image_url_xxl: thumbnails.find(thumbnail => thumbnail.label === 'X-Large 4K')?.url || null,
        image_url_xl: thumbnails.find(thumbnail => thumbnail.label === 'Large 2048')?.url || null,
        image_url_l: thumbnails.find(thumbnail => thumbnail.label === 'Large')?.url || null,
        image_url_m: thumbnails.find(thumbnail => thumbnail.label === 'Medium')?.url || null,
        image_url_s: thumbnails.find(thumbnail => thumbnail.label === 'Small 320')?.url || null,
        image_url_xs: thumbnails.find(thumbnail => thumbnail.label === 'Thumbnail')?.url || null,
    }
}

export function convertLicense(flickrLicense: string) {
    const mapping = new Map<string, string>([
        ['4', 'CC BY 2.0'],
        ['5', 'CC BY-SA 2.0'],
        ['6', 'CC BY-ND 2.0'],
        ['9', 'CC0'],
        ['10', 'CC0'],
        ['11', 'CC BY 4.0'],
        ['12', 'CC BY-SA 4.0'],
        ['13', 'CC BY-ND 4.0'],
    ])

    return mapping.get(flickrLicense)
}