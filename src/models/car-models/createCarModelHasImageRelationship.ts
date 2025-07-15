import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CarModelHasImageRelationship} from "./types/CarModelHasImageRelationship.ts"
import {CarModelRelationship} from "./types/CarModelRelationship.ts"

export async function createCarModelHasImageRelationship(carModelId: number, imageId: number): Promise<false | CarModelHasImageRelationship> {
    const baseRelationship = await createRelationship(
        carModelId,
        imageId,
        DbRelationship.NodeHasImage,
    )

    if (!baseRelationship) {
        return false
    }

    const specificRelationship: CarModelHasImageRelationship = {
        car_model_id: carModelId,
        image_id: imageId,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: CarModelRelationship.hasImage,
        created_at: baseRelationship.created_at,
        updated_at: baseRelationship.updated_at,
    }

    return specificRelationship
}
