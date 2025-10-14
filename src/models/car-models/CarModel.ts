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
import {getAllHasImageRelationships} from "./getAllHasImageRelationships"
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
import {deleteDeprecatedRelationship} from "../relationships/deleteDeprecatedRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {deleteHasPrimeImageRelationship} from "./deleteHasPrimeImageRelationship"
import {deleteHasImageRelationship} from "./deleteHasImageRelationship"
import {deleteBelongsToBrandRelationship} from "./deleteBelongsToBrandRelationship"
import {createHasSuccessorRelationship} from "./createHasSuccessorRelationship"
import {getSpecificHasSuccessorRelationship} from "./getSpecificHasSuccessorRelationship"
import type {CarModelHasSuccessorRelationship} from "./types/CarModelHasSuccessorRelationship"

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

    static async delete(carModelId: number): Promise<void> {
        const node = await CarModel.findById(carModelId)
        if (!node) {
            throw new NodeNotFoundError(carModelId)
        }

        await deleteNode(carModelId)
    }

    static async createBelongsToBrandRelationship(carModelId: number, brandId: number): Promise<CarModelBelongsToBrandRelationship> {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const existingRelationship = await getSpecificBelongsToBrandRelationship(carModelId, brandId)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(CarModelRelationship.belongsToBrand, carModelId, brandId)
        }

        await deleteDeprecatedRelationship(carModelId, DbRelationship.BrandHasCarModel)

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

    static async deleteBelongsToBrandRelationship(carModelId: number, brandId: number): Promise<void> {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const relationship = await getSpecificBelongsToBrandRelationship(carModelId, brandId)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.belongsToBrand, carModelId, brandId)
        }

        await deleteBelongsToBrandRelationship(carModelId, brandId)
    }

    static async createHasSuccessorRelationship(carModelId: number, partnerId: number): Promise<CarModelHasSuccessorRelationship> {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const partner = await CarModel.findById(partnerId)
        if (!partner) {
            throw new NodeNotFoundError(partnerId)
        }

        const existingRelation = await getSpecificHasSuccessorRelationship(carModelId, partnerId)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(CarModelRelationship.hasSuccessor, carModelId, partnerId)
        }

        await deleteDeprecatedRelationship(carModelId, DbRelationship.CarModelHasSuccessor)

        const createdRelationship = await createHasSuccessorRelationship(carModelId, partnerId)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async createHasImageRelationship(carModelId: number, imageId: number): Promise<CarModelHasImageRelationship> {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelationship = await getSpecificHasImageRelationship(carModelId, imageId)
        if (existingRelationship) {
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
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        return getAllHasImageRelationships(carModelId)
    }

    static async deleteHasImageRelationship(carModelId: number, imageId: number): Promise<void> {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificHasImageRelationship(carModelId, imageId)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.hasImage, carModelId, imageId)
        }

        await deleteHasImageRelationship(carModelId, imageId)
    }

    static async createHasPrimeImageRelationship(carModelId: number, imageId: number): Promise<CarModelHasPrimeImageRelationship> {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelationship = await getSpecificHasPrimeImageRelationship(carModelId, imageId)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(CarModelRelationship.hasPrimeImage, carModelId, imageId)
        }

        await deleteDeprecatedRelationship(carModelId, DbRelationship.CarModelHasPrimeImage)

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

        const relationship = await getHasPrimeImageRelationship(carModelId)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.hasPrimeImage, carModelId, null)
        }

        return relationship
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

    static async deleteHasPrimeImageRelationship(carModelId: number, imageId: number): Promise<void> {
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

        await deleteHasPrimeImageRelationship(carModelId, imageId)
    }
}
