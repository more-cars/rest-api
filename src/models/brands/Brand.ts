import {BrandNode} from "../../types/brands/BrandNode"
import {BrandNodeUserData} from "../../types/brands/BrandNodeUserData"
import {CarModelNode} from "../../types/car-models/CarModelNode"
import {createNode} from "../../db/nodes/brands/createNode"
import {getNodeById} from "../../db/nodes/brands/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/brands/getAllNodesOfType"
import {deleteForeignBrandHasCarModelRelationship} from "./deleteForeignBrandHasCarModelRelationship"
import {getBrandHasCarModelRelationship} from "./getBrandHasCarModelRelationship"
import {createBrandHasCarModelRelationship} from "./createBrandHasCarModelRelationship"
import {BrandHasCarModelRelationship} from "../../types/brands/BrandHasCarModelRelationship"
import {getAllBrandHasCarModelRelationships} from "./getAllBrandHasCarModelRelationships"

export class Brand {
    static async create(data: BrandNodeUserData): Promise<BrandNode> {
        return await createNode(data)
    }

    static async findById(id: number): Promise<false | BrandNode> {
        return await getNodeById(id)
    }

    static async findAll(): Promise<BrandNode[]> {
        return await getAllNodesOfType()
    }

    static async createHasCarModelRelationship(brand: BrandNode, carModel: CarModelNode): Promise<false | BrandHasCarModelRelationship> {
        const existingRelation = await getBrandHasCarModelRelationship(brand, carModel)
        if (existingRelation) {
            return existingRelation
        }

        await deleteForeignBrandHasCarModelRelationship(brand, carModel)

        return await createBrandHasCarModelRelationship(brand, carModel)
    }

    static async getRelationshipsForHasCarModel(brandId: number): Promise<Array<BrandHasCarModelRelationship>> {
        const brand = await this.findById(brandId)

        if (!brand) {
            throw new Error(`A brand with ID #${brandId} not found.`)
        }

        return await getAllBrandHasCarModelRelationships(brand)
    }
}
