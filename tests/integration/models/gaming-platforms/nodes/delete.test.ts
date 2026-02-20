import {describe, expect, test} from 'vitest'
import {GamingPlatform} from "../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Deleting a GAMING PLATFORM', () => {
    test('that does not exist', async () => {
        await expect(GamingPlatform.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(ControllerNodeType.GAMING_PLATFORM)
        await expect(GamingPlatform.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
