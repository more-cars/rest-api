import {describe, expect, test} from 'vitest'
import {Video} from "../../../../../../src/models/node-types/videos/Video"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Deleting a VIDEO', () => {
    test('that does not exist', async () => {
        await expect(Video.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.Video)
        await expect(Video.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
