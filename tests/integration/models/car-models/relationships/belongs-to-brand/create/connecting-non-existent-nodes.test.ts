import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-brand‹ relationship with nodes that do not exist', async () => {
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
    const brand = await seedNode(ControllerNodeType.BRAND)

    await expect(CarModel.createBelongsToBrandRelationship(-42, brand.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createBelongsToBrandRelationship(carModel.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createBelongsToBrandRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
