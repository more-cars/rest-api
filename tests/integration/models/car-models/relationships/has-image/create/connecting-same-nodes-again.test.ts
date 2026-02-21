import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const carModel = await seedNode(ControllerNodeType.CarModel)
    const image = await seedNode(ControllerNodeType.Image)

    await expect(CarModel.createHasImageRelationship(carModel.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModel.createHasImageRelationship(carModel.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
