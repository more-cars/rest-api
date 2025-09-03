import {expect, test} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

test('Car Model exists, but has no relationship', async () => {
    const carModel = await seedCarModel()

    await expect(CarModel.getHasPrimeImageRelationship(carModel.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
