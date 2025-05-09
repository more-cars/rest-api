import {getNodeById} from "../db/car-models/getNodeById"
import {createNode} from "../db/car-models/createNode"
import {CarModelNode} from "../types/CarModelNode"
import {getAllNodesOfType} from "../db/car-models/getAllNodesOfType"

export class CarModel {
    static async findById(id: number): Promise<false | CarModelNode> {
        return await getNodeById(id)
    }

    static async findAll() {
        return await getAllNodesOfType()
    }

    static async create(data: any): Promise<CarModelNode> {
        return await createNode(data)
    }
}
