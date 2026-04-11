import type {WikimediaImageItem} from "./types/WikimediaImageItem"
import type {CreateExternalImageInput} from "../../../models/node-types/images/create/CreateExternalImageInput"

export function convertWikimediaImageItemToImageInput(data: WikimediaImageItem, thumbnailSize: number): CreateExternalImageInput {
    const originalWidth = data.width

    return {
        name: data.extmetadata.ObjectName.value,
        description: data.extmetadata.ImageDescription.value,
        creator: data.user,
        license: data.extmetadata.LicenseShortName.value,
        tags: null,
        source: data.descriptionurl,
        image_url_original: data.url,
        image_url_xxl: originalWidth >= 3840 ? data.thumburl.replace(`/${thumbnailSize}px-`, '/3840px-') : null,
        image_url_xl: originalWidth >= 1920 ? data.thumburl.replace(`/${thumbnailSize}px-`, '/1920px-') : null,
        image_url_l: originalWidth >= 1280 ? data.thumburl.replace(`/${thumbnailSize}px-`, '/1280px-') : null,
        image_url_m: originalWidth >= 500 ? data.thumburl.replace(`/${thumbnailSize}px-`, '/500px-') : null,
        image_url_s: originalWidth >= 330 ? data.thumburl.replace(`/${thumbnailSize}px-`, '/330px-') : null,
        image_url_xs: originalWidth >= 120 ? data.thumburl.replace(`/${thumbnailSize}px-`, '/120px-') : null,
    }
}
