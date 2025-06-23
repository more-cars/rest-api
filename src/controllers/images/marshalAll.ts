import {ImageNode} from "../../models/images/types/ImageNode"
import {marshal} from "./marshal"
import {ImageResponse} from "./types/ImageResponse"

/**
 * Creates a valid response object from the given collection of images.
 */
export function marshalAll(images: Array<ImageNode>): Array<ImageResponse> {
    const responseObjects: any[] = []

    images.forEach((image: ImageNode) => {
        responseObjects.push(marshal(image))
    })

    return responseObjects
}
