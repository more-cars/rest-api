import {getSpecificRelationship} from "../../db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"
import {BrandHasImageRelationship} from "./types/BrandHasImageRelationship"

export async function getSpecificBrandHasImageRelationship(brandId: number, imageId: number) {
    const dbRelationship = await getSpecificRelationship(
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
