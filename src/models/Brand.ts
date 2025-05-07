import {BrandNode} from "../types/BrandNode"
import {createBrandNode} from "../db/createBrandNode"
import {getBrandNodeById} from "../db/getBrandNodeById"
import {getBrandNodes} from "../db/getBrandNodes"

export class Brand {
    static async create(data: any): Promise<BrandNode> {
        return await createBrandNode(data)
    }

    static async findById(id: number): Promise<false | BrandNode> {
        return await getBrandNodeById(id)
    }

    static async findAll() {
        return await getBrandNodes()
    }
}
