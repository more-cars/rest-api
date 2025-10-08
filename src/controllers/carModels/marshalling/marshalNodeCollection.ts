import {CarModelNode} from "../../../models/car-models/types/CarModelNode"
import {marshalNode} from "./marshalNode"
import {CarModelResponse} from "../types/CarModelResponse"

export function marshalNodeCollection(carModels: Array<CarModelNode>): Array<CarModelResponse> {
    const responseObjects: Array<CarModelResponse> = []

    carModels.forEach((carModel: CarModelNode) => {
        responseObjects.push(marshalNode(carModel))
    })

    return responseObjects
}
