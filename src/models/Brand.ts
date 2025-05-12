import {BrandNode} from "../types/BrandNode"
import {CarModelNode} from "../types/CarModelNode"
import {createNode} from "../db/brands/createNode"
import {getNodeById} from "../db/brands/getNodeById"
import {getAllNodesOfType} from "../db/brands/getAllNodesOfType"
import {createRelationship} from "../db/createRelationship"
import {BrandHasCarModelRelationship} from "../types/brands/BrandHasCarModelRelationship"
import {BrandRelationship} from "../types/brands/BrandRelationship"

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
        const baseRelationship = await createRelationship(
            brand.id as number,
            carModel.id as number,
            BrandRelationship.hasCarModel,
        )

        const specificRelationship: BrandHasCarModelRelationship = {
            brand_id: brand.id as number,
            car_model_id: carModel.id as number,
            relationship_id: baseRelationship.relationship_id,
            relationship_name: BrandRelationship.hasCarModel,
        }

        return specificRelationship
    }
}
