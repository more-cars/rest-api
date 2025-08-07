import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {Brand} from "../../../../../../../src/models/brands/Brand"

test('An error should be returned when no relationship between BRAND and CAR MODEL exists', async () => {
    const brand = await seedBrand()
    const carModel = await seedCarModel()

    const relationship = await Brand.getRelationshipForHasCarModel(brand.id, carModel.id)

    expect(relationship)
        .toBeFalsy()
})
