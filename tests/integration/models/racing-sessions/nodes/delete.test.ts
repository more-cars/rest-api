import {describe, expect, test} from 'vitest'
import {RacingSession} from "../../../../../src/models/node-types/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Deleting a RACING SESSION', () => {
    test('that does not exist', async () => {
        await expect(RacingSession.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(NodeTypeEnum.RACING_SESSION)
        await expect(RacingSession.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
