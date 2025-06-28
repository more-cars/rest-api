import {CarModelNode} from "./types/CarModelNode"
import {CreateCarModelInput} from "./types/CreateCarModelInput"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/car-models/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/car-models/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/car-models/getAllNodesOfType"
import {CarModelBelongsToBrandRelationship} from "./types/CarModelBelongsToBrandRelationship"
import {Brand} from "../brands/Brand"
import {createCarModelBelongsToBrandRelationship} from "./createCarModelBelongsToBrandRelationship"
import {getAllCarModelBelongsToBrandRelationships} from "./getAllCarModelBelongsToBrandRelationships"

export class CarModel {
    static async create(data: CreateCarModelInput): Promise<CarModelNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | CarModelNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(): Promise<CarModelNode[]> {
        const nodes: Array<CarModelNode> = []
        const nodesDb = await getAllNodesOfType()

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async createBelongsToBrandRelationship(carModelId: number, brandId: number): Promise<false | CarModelBelongsToBrandRelationship> {
        const carModel = await CarModel.findById(carModelId)
        const brand = await Brand.findById(brandId)

        if (!carModel || !brand) {
            return false
        }

        return await createCarModelBelongsToBrandRelationship(carModelId, brandId)
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
