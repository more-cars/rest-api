import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {BrandRelationship} from "../../../../../../../src/models/brands/types/BrandRelationship"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"

test('Creating a "Brand has Image" relationship when both nodes exist', async () => {
    const brand = await seedBrand()
    const image = await seedImage()

    const createdRelationship = await Brand.createHasImageRelationship(brand.id, image.id)

    expect(createdRelationship.origin.id)
        .toEqual(brand.id)
    expect(createdRelationship.destination.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(BrandRelationship.hasImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
