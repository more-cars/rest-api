import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../src/models/node-types/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Deleting a LAP TIME', () => {
    test('that does not exist', async () => {
        await expect(LapTime.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.LapTime)
        await expect(LapTime.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
