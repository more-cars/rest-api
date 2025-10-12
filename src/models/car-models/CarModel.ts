import {CarModelNode} from "./types/CarModelNode"
import {CreateCarModelInput} from "./types/CreateCarModelInput"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/car-models/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/car-models/getNodeById"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {getAllNodesOfType} from "../../db/nodes/car-models/getAllNodesOfType"
import {deleteNode} from "../../db/nodes/deleteNode"
import {CarModelBelongsToBrandRelationship} from "./types/CarModelBelongsToBrandRelationship"
import {Brand} from "../brands/Brand"
import {createBelongsToBrandRelationship} from "./createBelongsToBrandRelationship"
import {Image} from "../images/Image"
import {CarModelHasImageRelationship} from "./types/CarModelHasImageRelationship"
import {getCarModelHasImageRelationship} from "./getCarModelHasImageRelationship"
import {createHasImageRelationship} from "./createHasImageRelationship"
import {getAllCarModelHasImageRelationships} from "./getAllCarModelHasImageRelationships"
import {CarModelHasPrimeImageRelationship} from "./types/CarModelHasPrimeImageRelationship"
import {createHasPrimeImageRelationship} from "./createHasPrimeImageRelationship"
import {getHasPrimeImageRelationship} from "./getHasPrimeImageRelationship"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {getBelongsToBrandRelationship} from "./getBelongsToBrandRelationship"
import {CarModelRelationship} from "./types/CarModelRelationship"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {getSpecificBelongsToBrandRelationship} from "./getSpecificBelongsToBrandRelationship"
import {getSpecificHasImageRelationship} from "./getSpecificHasImageRelationship"
import {getSpecificHasPrimeImageRelationship} from "./getSpecificHasPrimeImageRelationship"

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

    static async findAll(options: NodeCollectionConstraints = {}): Promise<CarModelNode[]> {
        const nodes: Array<CarModelNode> = []
        const nodesDb = await getAllNodesOfType(options)

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
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const existingRelation = await getSpecificBelongsToBrandRelationship(carModelId, brandId)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(CarModelRelationship.belongsToBrand, carModelId, brandId)
        }

        const createdRelationship = await createBelongsToBrandRelationship(carModelId, brandId)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getBelongsToBrandRelationship(carModelId: number): Promise<CarModelBelongsToBrandRelationship> {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const relationship = await getBelongsToBrandRelationship(carModelId)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.belongsToBrand, carModelId)
        }

        return relationship
    }

    static async createHasImageRelationship(carModelId: number, imageId: number): Promise<false | CarModelHasImageRelationship> {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificHasImageRelationship(carModelId, imageId)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(CarModelRelationship.hasImage, carModelId, imageId)
        }

        const createdRelationship = await createHasImageRelationship(carModelId, imageId)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getSpecificHasImageRelationship(carModelId: number, imageId: number): Promise<CarModelHasImageRelationship> {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getCarModelHasImageRelationship(carModelId, imageId)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.hasImage, carModelId, imageId)
        }

        return relationship
    }

    static async getAllHasImageRelationships(carModelId: number): Promise<Array<CarModelHasImageRelationship>> {
        const carModel = await this.findById(carModelId)

        if (!carModel) {
            throw new Error(`A car model with ID #${carModelId} not found.`)
        }

        return await getAllCarModelHasImageRelationships(carModel)
    }

    static async createHasPrimeImageRelationship(carModelId: number, imageId: number): Promise<false | CarModelHasPrimeImageRelationship> {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificHasPrimeImageRelationship(carModelId, imageId)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(CarModelRelationship.hasPrimeImage, carModelId, imageId)
        }

        const createdRelationship = await createHasPrimeImageRelationship(carModelId, imageId)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
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

    static async getSpecificHasPrimeImageRelationship(carModelId: number, imageId: number): Promise<CarModelHasPrimeImageRelationship> {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificHasPrimeImageRelationship(carModelId, imageId)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.hasPrimeImage, carModelId, imageId)
        }

        return relationship
    }
}
