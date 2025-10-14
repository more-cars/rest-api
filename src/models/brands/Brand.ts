import {BrandNode} from "./types/BrandNode"
import {CreateBrandInput} from "./types/CreateBrandInput"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/brands/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/brands/getNodeById"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {getAllNodesOfType} from "../../db/nodes/brands/getAllNodesOfType"
import {deleteNode} from "../../db/nodes/deleteNode"
import {BrandHasCarModelRelationship} from "./types/BrandHasCarModelRelationship"
import {CarModel} from "../car-models/CarModel"
import {createHasCarModelRelationship} from "./createHasCarModelRelationship"
import {deleteDeprecatedRelationship} from "../relationships/deleteDeprecatedRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {getSpecificHasCarModelRelationship} from "./getSpecificHasCarModelRelationship"
import {getAllBrandHasCarModelRelationships} from "./getAllBrandHasCarModelRelationships"
import {BrandHasImageRelationship} from "./types/BrandHasImageRelationship"
import {getSpecificHasImageRelationship} from "./getSpecificHasImageRelationship"
import {Image} from "../images/Image"
import {createHasImageRelationship} from "./createHasImageRelationship"
import {getAllBrandHasImageRelationships} from "./getAllBrandHasImageRelationships"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {BrandRelationship} from "./types/BrandRelationship"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {deleteHasCarModelRelationship} from "./deleteHasCarModelRelationship"
import {deleteHasImageRelationship} from "./deleteHasImageRelationship"
import {createHasPrimeImageRelationship} from "./createHasPrimeImageRelationship"
import {getSpecificHasPrimeImageRelationship} from "./getSpecificHasPrimeImageRelationship"
import type {BrandHasPrimeImageRelationship} from "./types/BrandHasPrimeImageRelationship"
import {getHasPrimeImageRelationship} from "./getHasPrimeImageRelationship"

export class Brand {
    static async create(data: CreateBrandInput): Promise<BrandNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | BrandNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(options: NodeCollectionConstraints = {}): Promise<BrandNode[]> {
        const nodes: Array<BrandNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async delete(brandId: number): Promise<void> {
        const node = await Brand.findById(brandId)
        if (!node) {
            throw new NodeNotFoundError(brandId)
        }

        await deleteNode(brandId)
    }

    static async createHasCarModelRelationship(brandId: number, carModelId: number): Promise<BrandHasCarModelRelationship> {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const existingRelationship = await getSpecificHasCarModelRelationship(brandId, carModelId)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(BrandRelationship.hasCarModel, brandId, carModelId)
        }

        await deleteDeprecatedRelationship(carModelId, DbRelationship.BrandHasCarModel)

        const createdRelationship = await createHasCarModelRelationship(brandId, carModelId)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getSpecificHasCarModelRelationship(brandId: number, carModelId: number): Promise<BrandHasCarModelRelationship> {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const relationship = await getSpecificHasCarModelRelationship(brandId, carModelId)
        if (!relationship) {
            throw new RelationshipNotFoundError(BrandRelationship.hasCarModel, brandId, carModelId)
        }

        return relationship
    }

    static async getAllHasCarModelRelationships(brandId: number): Promise<Array<BrandHasCarModelRelationship>> {
        const brand = await this.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        return getAllBrandHasCarModelRelationships(brandId)
    }

    static async deleteHasCarModelRelationship(brandId: number, carModelId: number): Promise<void> {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const relationship = await getSpecificHasCarModelRelationship(brandId, carModelId)
        if (!relationship) {
            throw new RelationshipNotFoundError(BrandRelationship.hasCarModel, brandId, carModelId)
        }

        await deleteHasCarModelRelationship(brandId, carModelId)
    }

    static async createHasImageRelationship(brandId: number, imageId: number): Promise<BrandHasImageRelationship> {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelationship = await getSpecificHasImageRelationship(brandId, imageId)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(BrandRelationship.hasImage, brandId, imageId)
        }

        const createdRelationship = await createHasImageRelationship(brandId, imageId)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getSpecificHasImageRelationship(brandId: number, imageId: number): Promise<BrandHasImageRelationship> {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificHasImageRelationship(brandId, imageId)
        if (!relationship) {
            throw new RelationshipNotFoundError(BrandRelationship.hasImage, brandId, imageId)
        }

        return relationship
    }

    static async getAllHasImageRelationships(brandId: number): Promise<Array<BrandHasImageRelationship>> {
        const brand = await this.findById(brandId)

        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        return getAllBrandHasImageRelationships(brandId)
    }

    static async deleteHasImageRelationship(brandId: number, imageId: number): Promise<void> {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificHasImageRelationship(brandId, imageId)
        if (!relationship) {
            throw new RelationshipNotFoundError(BrandRelationship.hasImage, brandId, imageId)
        }

        await deleteHasImageRelationship(brandId, imageId)
    }

    static async createHasPrimeImageRelationship(brandId: number, imageId: number): Promise<BrandHasPrimeImageRelationship> {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificHasPrimeImageRelationship(brandId, imageId)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(BrandRelationship.hasPrimeImage, brandId, imageId)
        }

        await deleteDeprecatedRelationship(brandId, DbRelationship.BrandHasPrimeImage)

        const createdRelationship = await createHasPrimeImageRelationship(brandId, imageId)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getHasPrimeImageRelationship(brandId: number): Promise<BrandHasPrimeImageRelationship> {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const relationship = await getHasPrimeImageRelationship(brandId)
        if (!relationship) {
            throw new RelationshipNotFoundError(BrandRelationship.hasPrimeImage, brandId, null)
        }

        return relationship
    }
}
