import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"
import {BrandHasImageRelationship} from "./types/BrandHasImageRelationship.ts"

export async function getBrandHasImageRelationship(brandId: number, imageId: number): Promise<false | BrandHasImageRelationship> {
    const relationship = await getSpecificRelationship(
        brandId,
        imageId,
        DbRelationship.NodeHasImage,
    )

    if (!relationship) {
        return false
    }

    const specificRelationship: BrandHasImageRelationship = {
        brand_id: brandId,
        image_id: imageId,
        relationship_id: relationship.relationship_id,
        relationship_name: BrandRelationship.hasImage,
        created_at: relationship.created_at,
        updated_at: relationship.updated_at,
    }

    return specificRelationship
}
