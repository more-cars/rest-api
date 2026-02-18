import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-node‹ relationship again', async () => {
    const image = await seedNode(NodeTypeEnum.IMAGE)
    const brand = await seedNode(NodeTypeEnum.BRAND)

    await expect(Image.createBelongsToNodeRelationship(image.id, brand.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Image.createBelongsToNodeRelationship(image.id, brand.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
