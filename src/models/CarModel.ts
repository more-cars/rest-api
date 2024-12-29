import {getCarModelNodeById} from "../db/getCarModelNodeById"
import {CarModelType} from "../types/CarModelType"
import {createCarModelNode} from "../db/createCarModelNode"

export class CarModel {
    static async findById(id: number) {
        return await getCarModelNodeById(id)
    }

    static async create(data: CarModelType) {
        return await createCarModelNode(data)
    }
}