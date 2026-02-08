import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../src/models/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Deleting a LAP TIME', () => {
    test('that does not exist', async () => {
        await expect(LapTime.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(NodeTypeEnum.LAP_TIME)
        await expect(LapTime.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
