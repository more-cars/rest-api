import {BrandNode} from "./types/BrandNode"
import {CarModelNode} from "../car-models/types/CarModelNode"
import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"
import {BrandHasCarModelRelationship} from "./types/BrandHasCarModelRelationship"

/**
 * Creates a HAS_CAR_MODEL relationship between the given nodes.
 */
export async function createBrandHasCarModelRelationship(brand: BrandNode, carModel: CarModelNode): Promise<false | BrandHasCarModelRelationship> {
    const baseRelationship = await createRelationship(
        brand.id as number,
        carModel.id as number,
        DbRelationship.BrandHasCarModel,
    )

    if (!baseRelationship) {
        return false
    }

    const specificRelationship: BrandHasCarModelRelationship = {
        brand_id: brand.id as number,
        car_model_id: carModel.id as number,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: BrandRelationship.hasCarModel,
    }

    return specificRelationship
}
