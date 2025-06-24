import {CarModelNode} from "../../models/car-models/types/CarModelNode"
import {marshal} from "./marshal"
import {CarModelResponse} from "./types/CarModelResponse"

/**
 * Creates a valid response object from the given collection of car models.
 */
export function marshalAll(carModels: Array<CarModelNode>): Array<CarModelResponse> {
    const responseObjects: Array<CarModelResponse> = []

    carModels.forEach((carModel: CarModelNode) => {
        responseObjects.push(marshal(carModel))
    })

    return responseObjects
}
