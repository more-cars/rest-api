import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"

test('Trying to create a ›has-car-model‹ relationship with nodes that do not exist', async () => {
    const brand = await seedNode(ControllerNodeType.BRAND)
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)

    await expect(Brand.createHasCarModelRelationship(-42, carModel.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createHasCarModelRelationship(brand.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createHasCarModelRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
