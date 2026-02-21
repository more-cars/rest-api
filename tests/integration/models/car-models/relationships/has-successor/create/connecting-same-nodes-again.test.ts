import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-successor‹ relationship again', async () => {
    const carModel = await seedNode(ControllerNodeType.CarModel)
    const partnerNode = await seedNode(ControllerNodeType.CarModel)

    await expect(CarModel.createHasSuccessorRelationship(carModel.properties.id, partnerNode.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModel.createHasSuccessorRelationship(carModel.properties.id, partnerNode.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
