import {BrandNode} from "./types/BrandNode"
import {CarModelNode} from "../car-models/types/CarModelNode"
import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"
import {BrandHasCarModelRelationship} from "./types/BrandHasCarModelRelationship"

/**
 * Returns the HAS_CAR_MODEL relationship between the given nodes when it exists.
 */
export async function getBrandHasCarModelRelationship(brand: BrandNode, carModel: CarModelNode): Promise<false | BrandHasCarModelRelationship> {
    const relationship = await getSpecificRelationship(
        brand.id as number,
        carModel.id as number,
        DbRelationship.BrandHasCarModel,
    )

    if (!relationship) {
        return false
    }

    const specificRelationship: BrandHasCarModelRelationship = {
        brand_id: brand.id as number,
        car_model_id: carModel.id as number,
        relationship_id: relationship.relationship_id,
        relationship_name: BrandRelationship.hasCarModel,
    }

    return specificRelationship
}
