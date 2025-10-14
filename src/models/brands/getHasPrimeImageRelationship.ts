import {getRelationshipForSpecificNode} from "../../db/relationships/getRelationshipForSpecificNode"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"
import {BrandHasPrimeImageRelationship} from "./types/BrandHasPrimeImageRelationship"

export async function getHasPrimeImageRelationship(brandId: number) {
    const dbRelationship = await getRelationshipForSpecificNode(
        brandId,
        DbRelationship.BrandHasPrimeImage,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        brand_id: dbRelationship.start_node_id,
        image_id: dbRelationship.end_node_id,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: BrandRelationship.hasPrimeImage,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at
    } as BrandHasPrimeImageRelationship
}
