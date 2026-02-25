import {describe, expect, test} from 'vitest'
import {Brand} from "../../../../../../src/models/node-types/brands/Brand"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Deleting a BRAND', () => {
    test('that does not exist', async () => {
        await expect(Brand.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.Brand)
        await expect(Brand.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
