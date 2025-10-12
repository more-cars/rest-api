import {expect, test} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('CAR MODEL exists, but has no ›has-image‹ relationships', async () => {
    const carModel = await seedCarModel()

    const relationships = await CarModel.getAllHasImageRelationships(carModel.id)

    expect(relationships.length)
        .toBe(0)
})
