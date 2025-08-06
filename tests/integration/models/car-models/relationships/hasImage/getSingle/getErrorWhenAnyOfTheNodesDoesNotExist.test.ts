import {expect, test} from 'vitest'
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('An error should be returned when the CAR MODEL does not exist', async () => {
    const image = await seedImage()
    const relationship = await CarModel.getRelationshipForHasImage(-42, image.id)

    expect(relationship)
        .toBeFalsy()
})

test('An error should be returned when the IMAGE does not exist', async () => {
    const carModel = await seedCarModel()
    const relationship = await CarModel.getRelationshipForHasImage(carModel.id, -43)

    expect(relationship)
        .toBeFalsy()
})

test('An error should be returned when both nodes do not exist', async () => {
    const relationship = await CarModel.getRelationshipForHasImage(-42, -43)

    expect(relationship)
        .toBeFalsy()
})
