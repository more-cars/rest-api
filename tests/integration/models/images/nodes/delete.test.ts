import {describe, expect, test} from 'vitest'
import {Image} from "../../../../../src/models/node-types/images/Image"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Deleting an IMAGE', () => {
    test('that does not exist', async () => {
        await expect(Image.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(ControllerNodeType.IMAGE)
        await expect(Image.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
