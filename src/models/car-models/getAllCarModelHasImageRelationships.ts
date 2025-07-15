import {DbRelationship} from "../../db/types/DbRelationship"
import {getRelationshipsForSpecificNode} from "../../db/relationships/getRelationshipsForSpecificNode"
import {CarModelNode} from "./types/CarModelNode"
import {CarModelHasImageRelationship} from "./types/CarModelHasImageRelationship"
import {CarModelRelationship} from "./types/CarModelRelationship"

export async function getAllCarModelHasImageRelationships(carModel: CarModelNode) {
    const relationships = await getRelationshipsForSpecificNode(
        carModel.id,
        DbRelationship.NodeHasImage,
    )
    const mappedRelationships: CarModelHasImageRelationship[] = []

    relationships.forEach(relationship => {
        mappedRelationships.push(<CarModelHasImageRelationship>{
            car_model_id: relationship.start_node_id,
            image_id: relationship.end_node_id,
            relationship_id: relationship.relationship_id,
            relationship_name: CarModelRelationship.hasImage,
            created_at: relationship.created_at,
            updated_at: relationship.updated_at,
        })
    })

    return mappedRelationships
}
