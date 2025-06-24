import {BrandNode} from "./types/BrandNode"
import {CreateBrandInput} from "./types/CreateBrandInput"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/brands/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/brands/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/brands/getAllNodesOfType"
import {BrandHasCarModelRelationship} from "./types/BrandHasCarModelRelationship"
import {createBrandHasCarModelRelationship} from "./createBrandHasCarModelRelationship"
import {deleteForeignBrandHasCarModelRelationship} from "./deleteForeignBrandHasCarModelRelationship"
import {getBrandHasCarModelRelationship} from "./getBrandHasCarModelRelationship"
import {getAllBrandHasCarModelRelationships} from "./getAllBrandHasCarModelRelationships"

export class Brand {
    static async create(data: CreateBrandInput): Promise<BrandNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | BrandNode> {
        return await getNodeById(id)
    }

    static async findAll(): Promise<BrandNode[]> {
        return await getAllNodesOfType()
    }

    static async createHasCarModelRelationship(brandId: number, carModelId: number): Promise<false | BrandHasCarModelRelationship> {
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
}
