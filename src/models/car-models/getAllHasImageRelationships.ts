import {getRelationshipsForSpecificNode} from "../../db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {CarModelHasImageRelationship} from "./types/CarModelHasImageRelationship"
import {CarModelRelationship} from "./types/CarModelRelationship"

export async function getAllHasImageRelationships(carModelId: number) {
    const dbRelationships = await getRelationshipsForSpecificNode(
        carModelId,
        DbRelationship.NodeHasImage,
    )

    const mappedRelationships: CarModelHasImageRelationship[] = []

    dbRelationships.forEach(dbRelationship => {
        mappedRelationships.push({
            car_model_id: dbRelationship.start_node_id,
            image_id: dbRelationship.end_node_id,
            relationship_id: dbRelationship.relationship_id,
            relationship_name: CarModelRelationship.hasImage,
            created_at: dbRelationship.created_at,
            updated_at: dbRelationship.updated_at,
        } as CarModelHasImageRelationship)
    })

    return mappedRelationships
}
