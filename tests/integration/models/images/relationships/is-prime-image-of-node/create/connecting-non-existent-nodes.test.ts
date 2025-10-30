import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Image} from "../../../../../../../src/models/images/Image"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›is-prime-image-of-node‹ relationship with nodes that do not exist', async () => {
    const image = await seedNode(NodeTypeEnum.IMAGE)
    const node = await seedNode(NodeTypeEnum.COMPANY)

    await expect(Image.createIsPrimeImageOfNodeRelationship(-42, node.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Image.createIsPrimeImageOfNodeRelationship(image.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Image.createIsPrimeImageOfNodeRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
