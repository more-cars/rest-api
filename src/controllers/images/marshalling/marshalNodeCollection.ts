import {ImageNode} from "../../../models/images/types/ImageNode"
import {marshalNode} from "./marshalNode"
import {ImageResponse} from "../types/ImageResponse"

export function marshalNodeCollection(images: Array<ImageNode>): Array<ImageResponse> {
    const responseObjects: Array<ImageResponse> = []

    images.forEach((image: ImageNode) => {
        responseObjects.push(marshalNode(image))
    })

    return responseObjects
}
