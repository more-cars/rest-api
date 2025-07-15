import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"
import {BrandHasImageRelationship} from "./types/BrandHasImageRelationship.ts"

export async function createBrandHasImageRelationship(brandId: number, imageId: number): Promise<false | BrandHasImageRelationship> {
    const baseRelationship = await createRelationship(
        brandId,
        imageId,
        DbRelationship.NodeHasImage,
    )

    if (!baseRelationship) {
        return false
    }

    const specificRelationship: BrandHasImageRelationship = {
        brand_id: brandId,
        image_id: imageId,
        relationship_id: baseRelationship.relationship_id,
        relationship_name: BrandRelationship.hasImage,
        created_at: baseRelationship.created_at,
        updated_at: baseRelationship.updated_at,
    }

    return specificRelationship
}
