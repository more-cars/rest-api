import {ImageNode} from "../../../models/images/types/ImageNode"
import {marshalNode} from "./marshalNode"
import {ImageResponse} from "../types/ImageResponse"

export function marshalNodeCollection(nodes: Array<ImageNode>) {
    const responseObjects: Array<ImageResponse> = []

    nodes.forEach((node: ImageNode) => {
        responseObjects.push(marshalNode(node))
    })

    return responseObjects
}
