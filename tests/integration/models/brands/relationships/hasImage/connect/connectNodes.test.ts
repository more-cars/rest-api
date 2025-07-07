import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {BrandRelationship} from "../../../../../../../src/models/brands/types/BrandRelationship"
import {seedImage} from "../../../../../../dbSeeding/images/nodes/seedImage.ts"

test('Creating a "Brand has Image" relationship when both nodes exist', async () => {
    const brand = await seedBrand()
    const image = await seedImage()

    const createdRelationship = await Brand.createHasImageRelationship(brand.id, image.id)

    expect(createdRelationship)
        .toHaveProperty('brand_id', brand.id)
    expect(createdRelationship)
        .toHaveProperty('image_id', image.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', BrandRelationship.hasImage)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})
