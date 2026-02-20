import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-node‹ relationship again', async () => {
    const image = await seedNode(ControllerNodeType.IMAGE)
    const brand = await seedNode(ControllerNodeType.BRAND)

    await expect(Image.createBelongsToNodeRelationship(image.properties.id, brand.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Image.createBelongsToNodeRelationship(image.properties.id, brand.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
