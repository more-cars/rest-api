import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "../brands/types/BrandRelationship"
import {getRelationshipsForSpecificNode} from "../../db/relationships/getRelationshipsForSpecificNode"
import {CarModelNode} from "./types/CarModelNode"
import {CarModelBelongsToBrandRelationship} from "./types/CarModelBelongsToBrandRelationship"

export async function getAllCarModelBelongsToBrandRelationships(carModel: CarModelNode) {
    const relationships = await getRelationshipsForSpecificNode(
        carModel.id as number,
        DbRelationship.BrandHasCarModel,
        true,
    )
    const mappedRelationships: CarModelBelongsToBrandRelationship[] = []

    relationships.forEach(relationship => {
        mappedRelationships.push(<CarModelBelongsToBrandRelationship>{
            car_model_id: relationship.end_node_id,
            brand_id: relationship.start_node_id,
            relationship_id: relationship.relationship_id,
            relationship_name: BrandRelationship.hasCarModel,
            created_at: relationship.created_at,
            updated_at: relationship.updated_at,
        })
    })

    return mappedRelationships
}
