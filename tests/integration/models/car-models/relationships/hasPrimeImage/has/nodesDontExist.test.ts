import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Car Model does not exist', async () => {
    const carModel = await seedNode('car model')

    await expect(CarModel.hasHasPrimeImageRelationship(carModel.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Image does not exist', async () => {
    const image = await seedNode('car model')

    await expect(CarModel.hasHasPrimeImageRelationship(-42, image.id))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Both nodes do not exist', async () => {
    await expect(CarModel.hasHasPrimeImageRelationship(-42, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})