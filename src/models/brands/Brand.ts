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
import {deleteForeignBrandHasCarModelRelationship} from "./deleteForeignBrandHasCarModelRelationship"
import {getHasCarModelRelationship} from "./getHasCarModelRelationship"
import {getAllBrandHasCarModelRelationships} from "./getAllBrandHasCarModelRelationships"
import {BrandHasImageRelationship} from "./types/BrandHasImageRelationship"
import {getBrandHasImageRelationship} from "./getBrandHasImageRelationship"
import {Image} from "../images/Image"
import {createBrandHasImageRelationship} from "./createBrandHasImageRelationship"
import {getAllBrandHasImageRelationships} from "./getAllBrandHasImageRelationships"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {BrandRelationship} from "./types/BrandRelationship"

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

    static async delete(id: number): Promise<boolean> {
        return await deleteNode(id)
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

        const existingRelation = await getHasCarModelRelationship(brandId, carModelId)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(BrandRelationship.hasCarModel, brandId, carModelId)
        }

        await deleteForeignBrandHasCarModelRelationship(brandId, carModelId)

        const createdRelationship = await createHasCarModelRelationship(brandId, carModelId)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getSpecificHasCarModelRelationship(brandId: number, carModelId: number): Promise<false | BrandHasCarModelRelationship> {
        return await getHasCarModelRelationship(brandId, carModelId)
    }

    static async getRelationshipsForHasCarModel(brandId: number): Promise<Array<BrandHasCarModelRelationship>> {
        const brand = await this.findById(brandId)

        if (!brand) {
            throw new Error(`A brand with ID #${brandId} not found.`)
        }

        return await getAllBrandHasCarModelRelationships(brand)
    }

    static async createHasImageRelationship(brandId: number, imageId: number): Promise<false | BrandHasImageRelationship> {
        const brand = await Brand.findById(brandId)
        const image = await Image.findById(imageId)

        if (!brand || !image) {
            return false
        }

        const existingRelation = await getBrandHasImageRelationship(brandId, imageId)
        if (existingRelation) {
            return existingRelation
        }

        return await createBrandHasImageRelationship(brandId, imageId)
    }

    static async getSpecificHasImageRelationship(brandId: number, imageId: number): Promise<false | BrandHasImageRelationship> {
        return await getBrandHasImageRelationship(brandId, imageId)
    }

    static async getRelationshipsForHasImage(brandId: number): Promise<Array<BrandHasImageRelationship>> {
        const brand = await this.findById(brandId)

        if (!brand) {
            throw new Error(`A brand with ID #${brandId} not found.`)
        }

        return await getAllBrandHasImageRelationships(brand)
    }
}
