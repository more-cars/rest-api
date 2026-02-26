import {describe, expect, test} from 'vitest'
import {Magazine} from "../../../../../../src/models/node-types/magazines/Magazine"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Deleting a MAGAZINE', () => {
    test('that does not exist', async () => {
        await expect(Magazine.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.Magazine)
        await expect(Magazine.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
