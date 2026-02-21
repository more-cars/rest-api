import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"

test('Trying to create the same ›has-car-model‹ relationship again', async () => {
    const brand = await seedNode(ControllerNodeType.Brand)
    const carModel = await seedNode(ControllerNodeType.CarModel)

    await expect(Brand.createHasCarModelRelationship(brand.properties.id, carModel.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Brand.createHasCarModelRelationship(brand.properties.id, carModel.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
