import {expect, test} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {SemanticError} from "../../../../../../../src/models/types/SemanticError"

test('Trying to connect a CAR MODEL to itself', async () => {
    const carModel = await seedCarModel()

    await expect(CarModel.createIsSuccessorOfRelationship(carModel.id, carModel.id))
        .rejects
        .toThrow(SemanticError)
})
