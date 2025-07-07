import {BrandNode} from "./types/BrandNode"
import {CreateBrandInput} from "./types/CreateBrandInput"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/brands/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/brands/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/brands/getAllNodesOfType"
import {BrandHasCarModelRelationship} from "./types/BrandHasCarModelRelationship"
import {CarModel} from "../car-models/CarModel"
import {createBrandHasCarModelRelationship} from "./createBrandHasCarModelRelationship"
import {deleteForeignBrandHasCarModelRelationship} from "./deleteForeignBrandHasCarModelRelationship"
import {getBrandHasCarModelRelationship} from "./getBrandHasCarModelRelationship"
import {getAllBrandHasCarModelRelationships} from "./getAllBrandHasCarModelRelationships"
import {BrandHasImageRelationship} from "./types/BrandHasImageRelationship.ts"
import {getBrandHasImageRelationship} from "./getBrandHasImageRelationship.ts"
import {Image} from "../images/Image.ts"
import {createBrandHasImageRelationship} from "./createBrandHasImageRelationship.ts"
import {getAllBrandHasImageRelationships} from "./getAllBrandHasImageRelationships.ts"

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

    static async findAll(): Promise<BrandNode[]> {
        const nodes: Array<BrandNode> = []
        const nodesDb = await getAllNodesOfType()

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async createHasCarModelRelationship(brandId: number, carModelId: number): Promise<false | BrandHasCarModelRelationship> {
        const brand = await Brand.findById(brandId)
        const carModel = await CarModel.findById(carModelId)

        if (!brand || !carModel) {
            return false
        }

        const existingRelation = await getBrandHasCarModelRelationship(brandId, carModelId)
        if (existingRelation) {
            return existingRelation
        }

        await deleteForeignBrandHasCarModelRelationship(brandId, carModelId)

        return await createBrandHasCarModelRelationship(brandId, carModelId)
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

    static async getRelationshipsForHasImage(brandId: number): Promise<Array<BrandHasImageRelationship>> {
        const brand = await this.findById(brandId)

        if (!brand) {
            throw new Error(`A brand with ID #${brandId} not found.`)
        }

        return await getAllBrandHasImageRelationships(brand)
    }
}
