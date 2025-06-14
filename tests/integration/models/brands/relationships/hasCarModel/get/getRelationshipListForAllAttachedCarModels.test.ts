import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedCarModels} from "../../../../../../dbSeeding/car-models/nodes/seedCarModels"
import assert from "assert"

test('Requesting a relationship list for all CAR MODELs that are connected to a BRAND', async () => {
    const brand = await seedBrand()
    const carModels = await seedCarModels(3)

    for (const carModel of carModels) {
        await Brand.createHasCarModelRelationship(brand, carModel)
    }

    const relationships = await Brand.getRelationshipsForHasCarModel(brand.id)

    if (!relationships) {
        assert.fail(`Brand #${brand.id} not found.`)
    }

    expect(relationships.length)
        .toBe(3)
})
