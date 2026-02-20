import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›is-prime-image-of-node‹ relationship with nodes that do not exist', async () => {
    const image = await seedNode(ControllerNodeType.IMAGE)
    const node = await seedNode(ControllerNodeType.COMPANY)

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
