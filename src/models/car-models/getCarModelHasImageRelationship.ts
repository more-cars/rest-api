import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CarModelHasImageRelationship} from "./types/CarModelHasImageRelationship"
import {CarModelRelationship} from "./types/CarModelRelationship"

export async function getCarModelHasImageRelationship(carModelId: number, imageId: number): Promise<false | CarModelHasImageRelationship> {
    const relationship = await getSpecificRelationship(
        carModelId,
        imageId,
        DbRelationship.NodeHasImage,
    )

    if (!relationship) {
        return false
    }

    const specificRelationship: CarModelHasImageRelationship = {
        car_model_id: carModelId,
        image_id: imageId,
        relationship_id: relationship.relationship_id,
        relationship_name: CarModelRelationship.hasImage,
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    }

    return specificRelationship
}
