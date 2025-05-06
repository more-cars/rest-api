import {BrandNode} from "../types/BrandNode"
import {createBrandNode} from "../db/createBrandNode"

export class Brand {
    static async create(data: any): Promise<BrandNode> {
        return await createBrandNode(data)
    }
}
