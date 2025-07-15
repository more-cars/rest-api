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
import {Image} from "../images/Image"
import {CarModelHasImageRelationship} from "./types/CarModelHasImageRelationship"
import {getCarModelHasImageRelationship} from "./getCarModelHasImageRelationship"
import {createCarModelHasImageRelationship} from "./createCarModelHasImageRelationship"
import {getAllCarModelHasImageRelationships} from "./getAllCarModelHasImageRelationships"

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

    static async createHasImageRelationship(carModelId: number, imageId: number): Promise<false | CarModelHasImageRelationship> {
        const carModel = await CarModel.findById(carModelId)
        const image = await Image.findById(imageId)

        if (!carModel || !image) {
            return false
        }

        const existingRelation = await getCarModelHasImageRelationship(carModelId, imageId)
        if (existingRelation) {
            return existingRelation
        }

        return await createCarModelHasImageRelationship(carModelId, imageId)
    }

    static async getRelationshipsForHasImage(carModelId: number): Promise<Array<CarModelHasImageRelationship>> {
        const carModel = await this.findById(carModelId)

        if (!carModel) {
            throw new Error(`A car model with ID #${carModelId} not found.`)
        }

        return await getAllCarModelHasImageRelationships(carModel)
    }
}
