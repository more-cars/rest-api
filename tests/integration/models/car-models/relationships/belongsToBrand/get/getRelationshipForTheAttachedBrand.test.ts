import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import assert from "assert"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {CarModelBelongsToBrandSchema} from "../../../../../../_toolbox/schemas/CarModelBelongsToBrandSchema"

test('Requesting the relationship between CAR MODEL and attached BRAND', async () => {
    const carModel = await seedCarModel()
    const brand = await seedBrand()

    await CarModel.createBelongsToBrandRelationship(carModel.id, brand.id)

    const relationship = await CarModel.getRelationshipForBelongsToBrand(carModel.id)

    if (!relationship) {
        assert.fail(`Car Model #${carModel.id} not found.`)
    }

    validateJson(relationship, CarModelBelongsToBrandSchema)

    expect(relationship.brand_id)
        .toBe(brand.id)

    expect(relationship.car_model_id)
        .toBe(carModel.id)
})
