import {BrandNode} from "../types/BrandNode"
import {createNode} from "../db/brands/createNode"
import {getNodeById} from "../db/brands/getNodeById"
import {getAllNodesOfType} from "../db/brands/getAllNodesOfType"

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
}
