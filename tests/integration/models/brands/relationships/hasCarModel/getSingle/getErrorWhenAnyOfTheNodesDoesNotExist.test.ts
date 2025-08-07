import {expect, test} from 'vitest'
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"

test('An error should be returned when the BRAND does not exist', async () => {
    const carModel = await seedCarModel()
    const relationship = await Brand.getRelationshipForHasCarModel(-42, carModel.id)

    expect(relationship)
        .toBeFalsy()
})

test('An error should be returned when the CAR MODEL does not exist', async () => {
    const brand = await seedBrand()
    const relationship = await Brand.getRelationshipForHasCarModel(brand.id, -43)

    expect(relationship)
        .toBeFalsy()
})

test('An error should be returned when both nodes do not exist', async () => {
    const relationship = await Brand.getRelationshipForHasCarModel(-42, -43)

    expect(relationship)
        .toBeFalsy()
})
