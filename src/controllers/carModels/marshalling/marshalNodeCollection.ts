import {CarModelNode} from "../../../models/car-models/types/CarModelNode"
import {marshalNode} from "./marshalNode"
import {CarModelResponse} from "../types/CarModelResponse"

export function marshalNodeCollection(nodes: Array<CarModelNode>) {
    const responseObjects: Array<CarModelResponse> = []

    nodes.forEach((node: CarModelNode) => {
        responseObjects.push(marshalNode(node))
    })

    return responseObjects
}
