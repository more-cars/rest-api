import {expect, test} from 'vitest'
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('CAR MODEL does not exist', async () => {
    await expect(CarModel.getAllHasImageRelationships(-42))
        .rejects
        .toThrow(Error)
})
