import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedCarModels} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModels"
import assert from "assert"

test('A BRAND can have multiple CAR MODELs attached to it', async () => {
    const brand = await seedBrand()
    const carModelAmount = 3
    const carModels = await seedCarModels(carModelAmount)

    for (const carModel of carModels) {
        await Brand.createHasCarModelRelationship(brand.id, carModel.id)
    }

    const relationships = await Brand.getRelationshipsForHasCarModel(brand.id)

    if (!relationships) {
        assert.fail(`Brand #${brand.id} not found.`)
    }

    expect(relationships.length)
        .toBe(carModelAmount)
})
