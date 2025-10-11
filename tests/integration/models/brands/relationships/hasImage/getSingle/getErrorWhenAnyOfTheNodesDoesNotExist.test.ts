import {expect, test} from 'vitest'
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"

test('An error should be returned when the BRAND does not exist', async () => {
    const image = await seedImage()
    const relationship = await Brand.getSpecificHasImageRelationship(-42, image.id)

    expect(relationship)
        .toBeFalsy()
})

test('An error should be returned when the IMAGE does not exist', async () => {
    const brand = await seedBrand()
    const relationship = await Brand.getSpecificHasImageRelationship(brand.id, -43)

    expect(relationship)
        .toBeFalsy()
})

test('An error should be returned when both nodes do not exist', async () => {
    const relationship = await Brand.getSpecificHasImageRelationship(-42, -43)

    expect(relationship)
        .toBeFalsy()
})
