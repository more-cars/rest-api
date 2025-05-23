import {BrandNode} from "../types/brands/BrandNode"
import {BrandNodeUserData} from "../types/brands/BrandNodeUserData"
import {CarModelNode} from "../types/car-models/CarModelNode"
import {createNode} from "../db/brands/createNode"
import {getNodeById} from "../db/brands/getNodeById"
import {getAllNodesOfType} from "../db/brands/getAllNodesOfType"
import {deleteForeignBrandHasCarModelRelationship} from "./relationships/deleteForeignBrandHasCarModelRelationship"
import {getBrandHasCarModelRelationship} from "./relationships/getBrandHasCarModelRelationship"
import {createBrandHasCarModelRelationship} from "./relationships/createBrandHasCarModelRelationship"
import {BrandHasCarModelRelationship} from "../types/brands/BrandHasCarModelRelationship"

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
}
