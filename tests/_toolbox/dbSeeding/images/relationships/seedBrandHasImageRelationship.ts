import {seedImage} from "../nodes/seedImage"
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"
import {BrandNode} from "../../../../../src/models/brands/types/BrandNode"

export async function seedBrandHasImageRelationship(brand: BrandNode) {
    const image = await seedImage()

    return createRelationship(brand.id, image.id, DbRelationship.NodeHasImage)
}
