import {BrandNode} from "../types/BrandNode"
import {CarModelNode} from "../types/CarModelNode"
import {createNode} from "../db/brands/createNode"
import {getNodeById} from "../db/brands/getNodeById"
import {getAllNodesOfType} from "../db/brands/getAllNodesOfType"
import {getBrandHasCarModelRelationship} from "./relationships/getBrandHasCarModelRelationship"
import {createBrandHasCarModelRelationship} from "./relationships/createBrandHasCarModelRelationship"

export class Brand {
    static async create(data: any): Promise<BrandNode> {
        return await createNode(data)
    }

    static async findById(id: number): Promise<false | BrandNode> {
        return await getNodeById(id)
    }

    static async findAll() {
        return await getAllNodesOfType()
    }

    static async createHasCarModelRelationship(brand: BrandNode, carModel: CarModelNode) {
        const existingRelation = await getBrandHasCarModelRelationship(brand, carModel)
        if (existingRelation) {
            return existingRelation
        }

        return await createBrandHasCarModelRelationship(brand, carModel)
    }
}
