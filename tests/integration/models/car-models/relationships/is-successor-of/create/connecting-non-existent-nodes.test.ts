import {expect, test} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›is-successor-of‹ relationship with nodes that do not exist', async () => {
    const carModel = await seedCarModel()
    const partner = await seedCarModel()

    await expect(CarModel.createIsSuccessorOfRelationship(-42, partner.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createIsSuccessorOfRelationship(carModel.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createIsSuccessorOfRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
