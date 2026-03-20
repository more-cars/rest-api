import {describe, expect, test} from 'vitest'
import {Price} from "../../../../../../src/models/node-types/prices/Price"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Deleting a PRICE', () => {
    test('that does not exist', async () => {
        await expect(Price.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.Price)
        await expect(Price.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
