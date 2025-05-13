import {CarModelNode} from "../types/CarModelNode"
import {BrandNode} from "../types/BrandNode"
import {createNode} from "../db/car-models/createNode"
import {getNodeById} from "../db/car-models/getNodeById"
import {getAllNodesOfType} from "../db/car-models/getAllNodesOfType"
import {getCarModelBelongsToBrandRelationship} from "./relationships/getCarModelBelongsToBrandRelationship"
import {createCarModelBelongsToBrandRelationship} from "./relationships/createCarModelBelongsToBrandRelationship"

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

    static async createBelongsToBrandRelationship(carModel: CarModelNode, brand: BrandNode) {
        const existingRelation = await getCarModelBelongsToBrandRelationship(carModel, brand)
        if (existingRelation) {
            return existingRelation
        }

        return await createCarModelBelongsToBrandRelationship(carModel, brand)
    }
}
