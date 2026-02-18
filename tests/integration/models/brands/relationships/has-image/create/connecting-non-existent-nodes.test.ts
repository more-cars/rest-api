import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(Brand.createHasImageRelationship(-42, image.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createHasImageRelationship(brand.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
