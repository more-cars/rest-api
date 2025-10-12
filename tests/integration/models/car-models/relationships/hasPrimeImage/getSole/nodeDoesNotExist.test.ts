import {expect, test} from 'vitest'
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('CAR MODEL does not exist', async () => {
    await expect(CarModel.getHasPrimeImageRelationship(-42))
        .rejects
        .toThrow(NodeNotFoundError)
})
