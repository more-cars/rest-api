import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
    const image = await seedNode(ControllerNodeType.IMAGE)

    await expect(CarModel.createHasImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createHasImageRelationship(carModel.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
