import {marshal} from "./marshal"
import {ImageNode} from "../../types/images/ImageNode"

/**
 * Creates a valid response object from the given collection of images.
 */
export function marshalAll(images: Array<ImageNode>) {
    const responseObjects: any[] = []

    images.forEach((image: ImageNode) => {
        responseObjects.push(marshal(image))
    })

    return responseObjects
}
