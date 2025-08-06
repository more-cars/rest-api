import {expect, test} from 'vitest'
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('An error should be returned when no relationship between CAR MODEL and IMAGE exists', async () => {
    const carModel = await seedCarModel()
    const image = await seedImage()

    const relationship = await CarModel.getRelationshipForHasImage(carModel.id, image.id)

    expect(relationship)
        .toBeFalsy()
})
