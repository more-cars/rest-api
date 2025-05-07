import {BrandNode} from "../types/BrandNode"
import {createBrandNode} from "../db/createBrandNode"
import {getBrandNodeById} from "../db/getBrandNodeById"

export class Brand {
    static async create(data: any): Promise<BrandNode> {
        return await createBrandNode(data)
    }

    static async findById(id: number): Promise<false | BrandNode> {
        return await getBrandNodeById(id)
    }
}
