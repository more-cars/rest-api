import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"

test('Trying to create the same ›has-car-model‹ relationship again', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

    await expect(Brand.createHasCarModelRelationship(brand.id, carModel.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Brand.createHasCarModelRelationship(brand.id, carModel.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
