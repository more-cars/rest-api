import {describe, expect, test} from 'vitest'
import {Programme} from "../../../../../../src/models/node-types/programmes/Programme"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Deleting a PROGRAMME', () => {
    test('that does not exist', async () => {
        await expect(Programme.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.Programme)
        await expect(Programme.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
