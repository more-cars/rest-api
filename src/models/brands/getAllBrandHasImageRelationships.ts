import {BrandNode} from "./types/BrandNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"
import {getRelationshipsForSpecificNode} from "../../db/relationships/getRelationshipsForSpecificNode"
import {BrandHasImageRelationship} from "./types/BrandHasImageRelationship.ts"

export async function getAllBrandHasImageRelationships(brand: BrandNode) {
    const relationships = await getRelationshipsForSpecificNode(
        brand.id,
        DbRelationship.NodeHasImage,
    )
    const mappedRelationships: BrandHasImageRelationship[] = []

    relationships.forEach(relationship => {
        mappedRelationships.push(<BrandHasImageRelationship>{
            brand_id: relationship.start_node_id,
            image_id: relationship.end_node_id,
            relationship_id: relationship.relationship_id,
            relationship_name: BrandRelationship.hasImage,
            created_at: relationship.created_at,
            updated_at: relationship.updated_at,
        })
    })

    return mappedRelationships
}
