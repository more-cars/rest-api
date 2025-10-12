import {getRelationshipsForSpecificNode} from "../../db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandHasImageRelationship} from "./types/BrandHasImageRelationship"
import {BrandRelationship} from "./types/BrandRelationship"

export async function getAllBrandHasImageRelationships(brandId: number) {
    const relationships = await getRelationshipsForSpecificNode(
        brandId,
        DbRelationship.NodeHasImage,
    )

    const mappedRelationships: BrandHasImageRelationship[] = []

    relationships.forEach(relationship => {
        mappedRelationships.push({
            brand_id: relationship.start_node_id,
            image_id: relationship.end_node_id,
            relationship_id: relationship.relationship_id,
            relationship_name: BrandRelationship.hasImage,
            created_at: relationship.created_at,
            updated_at: relationship.updated_at,
        } as BrandHasImageRelationship)
    })

    return mappedRelationships
}
