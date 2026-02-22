import {describe, expect, test} from 'vitest'
import {GamingPlatform} from "../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Deleting a GAMING PLATFORM', () => {
    test('that does not exist', async () => {
        await expect(GamingPlatform.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.GamingPlatform)
        await expect(GamingPlatform.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
