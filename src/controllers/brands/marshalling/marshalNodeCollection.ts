import {BrandNode} from "../../../models/brands/types/BrandNode"
import {marshalNode} from "./marshalNode"
import {BrandResponse} from "../types/BrandResponse"

export function marshalNodeCollection(nodes: Array<BrandNode>) {
    const responseObjects: Array<BrandResponse> = []

    nodes.forEach((node: BrandNode) => {
        responseObjects.push(marshalNode(node))
    })

    return responseObjects
}
