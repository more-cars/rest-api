import {expect, test} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-successor‹ relationship with nodes that do not exist', async () => {
    const carModel = await seedCarModel()
    const partnerNode = await seedCarModel()

    await expect(CarModel.createHasSuccessorRelationship(-42, partnerNode.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createHasSuccessorRelationship(carModel.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createHasSuccessorRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
