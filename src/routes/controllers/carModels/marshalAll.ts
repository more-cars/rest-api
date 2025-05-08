import {CarModelNode} from "../../../types/CarModelNode"
import {marshal} from "./marshal"

/**
 * Creates a valid response object from the given collection of car models.
 */
export function marshalAll(carModels: Array<CarModelNode>) {
    const responseBodies: any[] = []

    carModels.forEach((carModel: CarModelNode) => {
        responseBodies.push(marshal(carModel))
    })

    return responseBodies
}
