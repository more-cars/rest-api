import {createRelationship} from "../../db/relationships/createRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {BrandRelationship} from "./types/BrandRelationship"
import {BrandHasPrimeImageRelationship} from "./types/BrandHasPrimeImageRelationship"

export async function createHasPrimeImageRelationship(brandId: number, imageId: number) {
    const dbRelationship = await createRelationship(
        brandId,
        imageId,
        DbRelationship.BrandHasPrimeImage,
    )

    if (!dbRelationship) {
        return false
    }

    return {
        brand_id: brandId,
        image_id: imageId,
        relationship_id: dbRelationship.relationship_id,
        relationship_name: BrandRelationship.hasPrimeImage,
        created_at: dbRelationship.created_at,
        updated_at: dbRelationship.updated_at,
    } as BrandHasPrimeImageRelationship
}
