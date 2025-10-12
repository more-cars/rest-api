import {getRelationshipsForSpecificNode} from "../../db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandHasCarModelRelationship} from "./types/BrandHasCarModelRelationship"
import {BrandRelationship} from "./types/BrandRelationship"

export async function getAllBrandHasCarModelRelationships(brandId: number) {
    const relationships = await getRelationshipsForSpecificNode(
        brandId,
        DbRelationship.BrandHasCarModel,
    )

    const mappedRelationships: BrandHasCarModelRelationship[] = []

    relationships.forEach(relationship => {
        mappedRelationships.push({
            brand_id: relationship.start_node_id,
            car_model_id: relationship.end_node_id,
            relationship_id: relationship.relationship_id,
            relationship_name: BrandRelationship.hasCarModel,
            created_at: relationship.created_at,
            updated_at: relationship.updated_at,
        } as BrandHasCarModelRelationship)
    })

    return mappedRelationships
}
