import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Expecting an error when any of the nodes does not exist', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

    await expect(Brand.createHasCarModelRelationship(-42, carModel.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createHasCarModelRelationship(brand.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createHasCarModelRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
