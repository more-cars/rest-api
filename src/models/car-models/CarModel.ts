import {CarModelNode} from "../../types/car-models/CarModelNode"
import {CarModelNodeUserData} from "../../types/car-models/CarModelNodeUserData"
import {BrandNode} from "../../types/brands/BrandNode"
import {createNode} from "../../db/nodes/car-models/createNode"
import {getNodeById} from "../../db/nodes/car-models/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/car-models/getAllNodesOfType"
import {createCarModelBelongsToBrandRelationship} from "./createCarModelBelongsToBrandRelationship"
import {CarModelBelongsToBrandRelationship} from "../../types/car-models/CarModelBelongsToBrandRelationship"
import {getAllCarModelBelongsToBrandRelationships} from "./getAllCarModelBelongsToBrandRelationships"

export class CarModel {
    static async create(data: CarModelNodeUserData): Promise<CarModelNode> {
        return await createNode(data)
    }

    static async findById(id: number): Promise<false | CarModelNode> {
        return await getNodeById(id)
    }

    static async findAll(): Promise<CarModelNode[]> {
        return await getAllNodesOfType()
    }

    static async createBelongsToBrandRelationship(carModel: CarModelNode, brand: BrandNode): Promise<false | CarModelBelongsToBrandRelationship> {
        return await createCarModelBelongsToBrandRelationship(carModel, brand)
    }

    static async getRelationshipForBelongsToBrand(carModelId: number): Promise<false | CarModelBelongsToBrandRelationship> {
        const carModel = await this.findById(carModelId)

        if (!carModel) {
            throw new Error(`A car model with ID #${carModelId} not found.`)
        }

        const relationships = await getAllCarModelBelongsToBrandRelationships(carModel)

        if (relationships.length === 0) {
            return false
        }

        return (relationships)[0]
    }
}
