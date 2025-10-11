import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"

test('An error should be returned when no relationship between BRAND and IMAGE exists', async () => {
    const brand = await seedBrand()
    const image = await seedImage()

    const relationship = await Brand.getSpecificHasImageRelationship(brand.id, image.id)

    expect(relationship)
        .toBeFalsy()
})
