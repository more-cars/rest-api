import {BrandNode} from "./types/BrandNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"
import {BrandHasCarModelRelationship} from "./types/BrandHasCarModelRelationship"
import {getRelationshipsForSpecificNode} from "../../db/relationships/getRelationshipsForSpecificNode"

export async function getAllBrandHasCarModelRelationships(brand: BrandNode) {
    const relationships = await getRelationshipsForSpecificNode(
        brand.id as number,
        DbRelationship.BrandHasCarModel,
    )
    const mappedRelationships: BrandHasCarModelRelationship[] = []

    relationships.forEach(relationship => {
        mappedRelationships.push(<BrandHasCarModelRelationship>{
            brand_id: relationship.start_node_id,
            car_model_id: relationship.end_node_id,
            relationship_id: relationship.relationship_id,
            relationship_name: BrandRelationship.hasCarModel,
            created_at: relationship.created_at,
            updated_at: relationship.updated_at,
        })
    })

    return mappedRelationships
}
