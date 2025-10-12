import {BrandHasImageRelationship} from "./types/BrandHasImageRelationship"
import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"

export async function createHasImageRelationship(brandId: number, imageId: number): Promise<false | BrandHasImageRelationship> {
    const dbRelationship = await createRelationship(
        brandId,
        imageId,
        DbRelationship.NodeHasImage,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        brand_id: brandId,
        image_id: imageId,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: BrandRelationship.hasImage,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    } as BrandHasImageRelationship
}
