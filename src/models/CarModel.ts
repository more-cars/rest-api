import {getCarModelNodeById} from "../db/getCarModelNodeById"
import {createCarModelNode} from "../db/createCarModelNode"
import {CarModelNode} from "../types/CarModelNode"

export class CarModel {
    static async findById(id: number): Promise<false | CarModelNode> {
        return await getCarModelNodeById(id)
    }

    static async create(data: any): Promise<CarModelNode> {
        return await createCarModelNode(data)
    }
}
