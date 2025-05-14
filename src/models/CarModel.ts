import {CarModelNode} from "../types/CarModelNode"
import {CarModelNodeUserData} from "../types/CarModelNodeUserData"
import {BrandNode} from "../types/BrandNode"
import {createNode} from "../db/car-models/createNode"
import {getNodeById} from "../db/car-models/getNodeById"
import {getAllNodesOfType} from "../db/car-models/getAllNodesOfType"
import {
    deleteForeignCarModelBelongsToBrandRelationship
} from "./relationships/deleteForeignCarModelBelongsToBrandRelationship"
import {getCarModelBelongsToBrandRelationship} from "./relationships/getCarModelBelongsToBrandRelationship"
import {createCarModelBelongsToBrandRelationship} from "./relationships/createCarModelBelongsToBrandRelationship"
import {CarModelBelongsToBrandRelationship} from "../types/car-models/CarModelBelongsToBrandRelationship"

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
        const existingRelation = await getCarModelBelongsToBrandRelationship(carModel, brand)
        if (existingRelation) {
            return existingRelation
        }

        await deleteForeignCarModelBelongsToBrandRelationship(carModel, brand)

        return await createCarModelBelongsToBrandRelationship(carModel, brand)
    }
}
