import {CarModelNode} from "./types/CarModelNode"
import {CreateCarModelInput} from "./types/CreateCarModelInput"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/car-models/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/car-models/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/car-models/getAllNodesOfType"
import {deleteNode} from "../../db/nodes/deleteNode"
import {CarModelBelongsToBrandRelationship} from "./types/CarModelBelongsToBrandRelationship"
import {Brand} from "../brands/Brand"
import {createCarModelBelongsToBrandRelationship} from "./createCarModelBelongsToBrandRelationship"
import {getAllCarModelBelongsToBrandRelationships} from "./getAllCarModelBelongsToBrandRelationships"
import {Image} from "../images/Image"
import {CarModelHasImageRelationship} from "./types/CarModelHasImageRelationship"
import {getCarModelHasImageRelationship} from "./getCarModelHasImageRelationship"
import {createCarModelHasImageRelationship} from "./createCarModelHasImageRelationship"
import {getAllCarModelHasImageRelationships} from "./getAllCarModelHasImageRelationships"
import {CarModelHasPrimeImageRelationship} from "./types/CarModelHasPrimeImageRelationship"
import {createHasPrimeImageRelationship} from "./createHasPrimeImageRelationship"
import {getHasPrimeImageRelationship} from "./getHasPrimeImageRelationship"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"

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

    static async delete(id: number): Promise<boolean> {
        return await deleteNode(id)
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

        return await createCarModelHasImageRelationship(carModelId, imageId)
    }

    static async getRelationshipForHasImage(carModelId: number, imageId: number): Promise<false | CarModelHasImageRelationship> {
        return await getCarModelHasImageRelationship(carModelId, imageId)
    }

    static async getRelationshipsForHasImage(carModelId: number): Promise<Array<CarModelHasImageRelationship>> {
        const carModel = await this.findById(carModelId)

        if (!carModel) {
            throw new Error(`A car model with ID #${carModelId} not found.`)
        }

        return await getAllCarModelHasImageRelationships(carModel)
    }

    static async createHasPrimeImageRelationship(carModelId: number, imageId: number): Promise<false | CarModelHasPrimeImageRelationship> {
        const carModel = await CarModel.findById(carModelId)
        const image = await Image.findById(imageId)

        if (!carModel || !image) {
            return false
        }

        return await createHasPrimeImageRelationship(carModelId, imageId)
    }

    static async getHasPrimeImageRelationship(carModelId: number): Promise<CarModelHasPrimeImageRelationship> {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const relation = await getHasPrimeImageRelationship(carModelId)
        if (!relation) {
            throw new RelationshipNotFoundError('has prime image', carModelId, null)
        }

        return relation
    }
}
