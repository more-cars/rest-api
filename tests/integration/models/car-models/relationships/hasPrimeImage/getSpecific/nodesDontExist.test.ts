import {describe, expect, test} from 'vitest'
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a specific ›has-prime-image‹ relationship', () => {
    test('with a CAR MODEL that does not exist', async () => {
        const image = await seedImage()

        await expect(CarModel.getSpecificHasPrimeImageRelationship(-42, image.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('with an IMAGE that does not exist', async () => {
        const carModel = await seedCarModel()

        await expect(CarModel.getSpecificHasPrimeImageRelationship(carModel.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('with a CAR MODEL and IMAGE that do not exist', async () => {
        await expect(CarModel.getSpecificHasPrimeImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
