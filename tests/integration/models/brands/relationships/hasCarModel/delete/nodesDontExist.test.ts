import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Brand does not exist', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)

    await expect(Brand.deleteHasCarModelRelationship(brand.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Car Model does not exist', async () => {
    const carModel = await seedNode(NodeTypeEnum.BRAND)

    await expect(Brand.deleteHasCarModelRelationship(-42, carModel.id))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Both nodes do not exist', async () => {
    await expect(Brand.deleteHasCarModelRelationship(-42, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})