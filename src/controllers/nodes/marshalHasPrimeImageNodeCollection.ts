import type {ImageNode} from "../node-types/images/types/ImageNode"
import type {NodeResponse} from "../types/NodeResponse"
import {marshalSingleNode} from "./marshalSingleNode"

export function marshalHasPrimeImageNodeCollection(images: ImageNode[]) {
    const nodeCollection: NodeResponse[] = []

    images.forEach(image => {
        nodeCollection.push(marshalSingleNode(image))
    })

    return {
        data: nodeCollection,
    }
}
