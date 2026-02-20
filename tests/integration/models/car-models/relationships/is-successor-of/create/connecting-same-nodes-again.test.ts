import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›is-successor-of‹ relationship again', async () => {
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
    const partner = await seedNode(ControllerNodeType.CAR_MODEL)

    await expect(CarModel.createIsSuccessorOfRelationship(carModel.properties.id, partner.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModel.createIsSuccessorOfRelationship(carModel.properties.id, partner.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
